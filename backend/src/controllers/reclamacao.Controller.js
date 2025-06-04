import mongoose from 'mongoose';
import Reclamacao from '../models/Reclamacao.js';

/**
 * Cria uma nova reclamação.
 * Rota: POST /reclamacoes
 * Apenas usuários (tipo: 'user') autenticados devem acessar.
 */
export const criarReclamacao = async (req, res) => {
  try {
    // Somente 'user' pode criar reclamação
    if (!req.user || req.user.tipo !== 'user') {
      return res
        .status(403)
        .json({ msg: 'Apenas usuários podem criar reclamações.' });
    }

    const { titulo, descricao, empresa: empresaId } = req.body;

    // Validação básica
    if (!titulo || !descricao || !empresaId) {
      return res
        .status(400)
        .json({ msg: 'Campos obrigatório: titulo, descricao, empresa.' });
    }

    // Garantir que o companyId é um ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(empresaId)) {
      return res.status(400).json({ msg: 'ID de empresa inválido.' });
    }

    // Construir o objeto de nova reclamação
    const novaReclamacao = new Reclamacao({
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      user: req.user.id,
      empresa: empresaId,
    });

    // Se vier uma imagem via Multer (req.file), salvar no Buffer
    if (req.file) {
      novaReclamacao.imagem = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    await novaReclamacao.save();
    return res.status(201).json(novaReclamacao);
  } catch (error) {
    console.error('Erro ao criar reclamação:', error);
    return res.status(500).json({ msg: 'Erro interno ao criar reclamação.' });
  }
};

/**
 * Lista todas as reclamações feitas pelo usuário autenticado.
 * Rota: GET /reclamacoes/meu-perfil
 * Apenas usuários (tipo: 'user') autenticados devem acessar.
 */
export const listarReclamacoesPorUsuario = async (req, res) => {
  try {
    if (!req.user || req.user.tipo !== 'user') {
      console.log('Usuário autenticado:', req.user);
      return res
        .status(403)
        .json({ msg: 'Apenas usuários podem acessar suas reclamações.' });
    }

    const reclamacoes = await Reclamacao.find({ user: req.user.id })
      .populate('empresa', 'nome email')
      .sort({ createdAt: -1 });

    const reclamacoesComImagem = reclamacoes.map((rec) => {
      let imagem = null;
      if (rec.imagem && rec.imagem.data) {
        imagem = {
          contentType: rec.imagem.contentType,
          data: rec.imagem.data.toString('base64'),
        };
      }
      return {
        ...rec.toObject(),
        imagem,
      };
    });

    return res.status(200).json(reclamacoesComImagem);
  } catch (error) {
    console.error('Erro ao listar reclamações do usuário:', error);
    return res.status(500).json({ msg: 'Erro interno ao listar reclamações.' });
  }
};

/**
 * Lista todas as reclamações recebidas por uma determinada empresa.
 * Rota: GET /reclamacoes/empresa
 * Apenas empresas (tipo: 'empresa') autenticadas devem acessar.
 */
export const listarReclamacoesPorEmpresa = async (req, res) => {
  try {
    if (!req.user || req.user.tipo !== 'empresa') {
      return res
        .status(403)
        .json({ msg: 'Apenas empresas podem acessar suas reclamações.' });
    }

    const reclamacoes = await Reclamacao.find({ empresa: req.user.id })
      .populate('user', 'nome email') // exibe nome e email do usuário autor
      .sort({ createdAt: -1 });

    return res.status(200).json(reclamacoes);
  } catch (error) {
    console.error('Erro ao listar reclamações da empresa:', error);
    return res.status(500).json({ msg: 'Erro interno ao listar reclamações.' });
  }
};

/**
 * Obtém uma reclamação pelo ID.
 * Rota: GET /reclamacoes/:id
 * Usuários só veem suas próprias, empresas só veem as que são direcionadas a elas.
 */
export const getReclamacaoPorId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: 'ID de reclamação inválido.' });
    }

    const reclamacao = await Reclamacao.findById(id)
      .populate('user', 'nome email')
      .populate('empresa', 'nome email')
      .populate('resposta.respondidoPor', 'nome email');

    if (!reclamacao) {
      return res.status(404).json({ msg: 'Reclamação não encontrada.' });
    }

    // Verificar permissões:
    // se for usuário, só pode ver se for autor
    if (
      req.user.tipo === 'user' &&
      reclamacao.user._id.toString() !== req.user.id
    ) {
      return res
        .status(403)
        .json({ msg: 'Você não pode ver esta reclamação.' });
    }
    // se for empresa, só se for empresa alvo
    if (
      req.user.tipo === 'empresa' &&
      reclamacao.empresa._id.toString() !== req.user.id
    ) {
      return res
        .status(403)
        .json({ msg: 'Você não pode ver esta reclamação.' });
    }

    return res.status(200).json(reclamacao);
  } catch (error) {
    console.error('Erro ao obter reclamação por ID:', error);
    return res.status(500).json({ msg: 'Erro interno ao buscar reclamação.' });
  }
};

/**
 * Atualiza (edita) uma reclamação.
 * Rota: PATCH /reclamacoes/:id
 * Somente o autor (tipo: 'user') e apenas se status for 'aberta'.
 */
export const editarReclamacao = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descricao } = req.body;

    if (!req.user || req.user.tipo !== 'user') {
      return res
        .status(403)
        .json({ msg: 'Apenas usuários podem editar reclamações.' });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: 'ID de reclamação inválido.' });
    }

    const reclamacao = await Reclamacao.findById(id);
    if (!reclamacao) {
      return res.status(404).json({ msg: 'Reclamação não encontrada.' });
    }
    if (reclamacao.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ msg: 'Você só pode editar suas próprias reclamações.' });
    }
    if (reclamacao.status !== 'aberta') {
      return res
        .status(400)
        .json({ msg: 'Só é possível editar reclamações abertas.' });
    }

    // Atualiza campos permitidos
    if (titulo) reclamacao.titulo = titulo.trim();
    if (descricao) reclamacao.descricao = descricao.trim();

    // Se vier nova imagem, sobrescreve
    if (req.file) {
      reclamacao.imagem = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    await reclamacao.save();
    return res.status(200).json(reclamacao);
  } catch (error) {
    console.error('Erro ao editar reclamação:', error);
    return res.status(500).json({ msg: 'Erro interno ao editar reclamação.' });
  }
};

/**
 * Deleta uma reclamação.
 * Rota: DELETE /reclamacoes/:id
 * Somente o autor (tipo: 'user') e apenas se status for 'aberta'.
 */
export const deletarReclamacao = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.user || req.user.tipo !== 'user') {
      return res
        .status(403)
        .json({ msg: 'Apenas usuários podem deletar reclamações.' });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: 'ID de reclamação inválido.' });
    }

    const reclamacao = await Reclamacao.findById(id);
    if (!reclamacao) {
      return res.status(404).json({ msg: 'Reclamação não encontrada.' });
    }
    if (reclamacao.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ msg: 'Você só pode deletar suas próprias reclamações.' });
    }
    if (reclamacao.status !== 'aberta') {
      return res
        .status(400)
        .json({ msg: 'Só é possível deletar reclamações abertas.' });
    }

    await reclamacao.remove();
    return res.status(200).json({ msg: 'Reclamação removida com sucesso.' });
  } catch (error) {
    console.error('Erro ao deletar reclamação:', error);
    return res.status(500).json({ msg: 'Erro interno ao deletar reclamação.' });
  }
};

/**
 * Responde uma reclamação (adiciona texto de resposta).
 * Rota: PATCH /reclamacoes/:id/responder
 * Somente empresas (tipo: 'empresa') e apenas se for direcionada a elas e status for 'aberta'.
 */
export const responderReclamacao = async (req, res) => {
  try {
    const { id } = req.params;
    const { texto } = req.body;

    if (!req.user || req.user.tipo !== 'empresa') {
      return res
        .status(403)
        .json({ msg: 'Apenas empresas podem responder reclamações.' });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: 'ID de reclamação inválido.' });
    }
    if (!texto || texto.trim() === '') {
      return res
        .status(400)
        .json({ msg: 'O texto da resposta é obrigatório.' });
    }

    const reclamacao = await Reclamacao.findById(id);
    if (!reclamacao) {
      return res.status(404).json({ msg: 'Reclamação não encontrada.' });
    }
    if (reclamacao.empresa.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ msg: 'Você só pode responder reclamações da sua empresa.' });
    }
    if (reclamacao.status !== 'aberta') {
      return res
        .status(400)
        .json({ msg: 'A reclamação já foi respondida ou está fechada.' });
    }

    reclamacao.resposta = {
      texto: texto.trim(),
      respondidoPor: req.user.id,
      data: new Date(),
    };
    reclamacao.status = 'respondida';

    await reclamacao.save();
    return res
      .status(200)
      .json({ msg: 'Resposta enviada com sucesso!', reclamacao });
  } catch (error) {
    console.error('Erro ao responder reclamação:', error);
    return res
      .status(500)
      .json({ msg: 'Erro interno ao responder reclamação.' });
  }
};

/**
 * Remove a resposta de uma reclamação (volta o status para 'aberta').
 * Rota: DELETE /reclamacoes/:id/remover-resposta
 * Somente empresas (tipo: 'empresa') e apenas se for a dona da reclamação e estiver respondida.
 */
export const removerResposta = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.user || req.user.tipo !== 'empresa') {
      return res
        .status(403)
        .json({ msg: 'Apenas empresas podem remover respostas.' });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: 'ID de reclamação inválido.' });
    }

    const reclamacao = await Reclamacao.findById(id);
    if (!reclamacao) {
      return res.status(404).json({ msg: 'Reclamação não encontrada.' });
    }
    if (reclamacao.empresa.toString() !== req.user.id) {
      return res.status(403).json({
        msg: 'Você só pode remover respostas das suas próprias reclamações.',
      });
    }
    if (reclamacao.status !== 'respondida') {
      return res.status(400).json({
        msg: 'Só é possível remover resposta de reclamação respondida.',
      });
    }

    reclamacao.resposta = undefined;
    reclamacao.status = 'aberta';

    await reclamacao.save();
    return res
      .status(200)
      .json({ msg: 'Resposta removida com sucesso.', reclamacao });
  } catch (error) {
    console.error('Erro ao remover resposta:', error);
    return res.status(500).json({ msg: 'Erro interno ao remover resposta.' });
  }
};
