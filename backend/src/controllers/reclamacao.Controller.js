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

    /**
     * Extração e destructuring dos dados da requisição
     * Incluindo o novo campo 'contato' para comunicação direta
     */
    const { titulo, descricao, empresa: empresaId, contato } = req.body;

    // Validação básica dos campos obrigatórios
    if (!titulo || !descricao || !empresaId) {
      return res
        .status(400)
        .json({ msg: 'Campos obrigatório: titulo, descricao, empresa.' });
    }

    /**
     * Validação específica do campo contato
     * Implementa regras de negócio para email/WhatsApp
     */
    if (contato) {
      const contatoTrimmed = contato.trim();

      // Validação de comprimento mínimo para evitar dados inválidos
      if (contatoTrimmed.length < 5) {
        return res.status(400).json({
          msg: 'Contato deve ter pelo menos 5 caracteres.',
        });
      }

      // Validação de formato usando regex combinado
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const whatsappRegex =
        /^(?:\+?55\s?)?(?:\(?\d{2}\)?[\s-]?)(?:9\d{4}[\s-]?\d{4}|\d{4}[\s-]?\d{4})$/;

      const isValidContact =
        emailRegex.test(contatoTrimmed) || whatsappRegex.test(contatoTrimmed);

      if (!isValidContact) {
        return res.status(400).json({
          msg: 'Contato deve ser um email válido ou WhatsApp no formato correto (Ex: email@dominio.com ou (11)99999-9999).',
        });
      }
    }

    // Garantir que o companyId é um ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(empresaId)) {
      return res.status(400).json({ msg: 'ID de empresa inválido.' });
    }

    /**
     * Construção do objeto de nova reclamação
     * Aplicando princípio de responsabilidade única
     */
    const dadosReclamacao = {
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      user: req.user.id,
      empresa: empresaId,
    };

    // Adiciona contato apenas se fornecido (campo opcional)
    if (contato && contato.trim()) {
      dadosReclamacao.contato = contato.trim();
    }

    const novaReclamacao = new Reclamacao(dadosReclamacao);

    /**
     * Processamento de imagem via Multer
     * Mantém compatibilidade com upload existente
     */
    if (req.file) {
      novaReclamacao.imagem = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    // Persistência no banco de dados
    await novaReclamacao.save();

    return res.status(201).json(novaReclamacao);
  } catch (error) {
    console.error('Erro ao criar reclamação:', error);

    // Tratamento específico para erros de validação do Mongoose
    if (error.name === 'ValidationError') {
      const mensagensErro = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json({
        msg: 'Dados inválidos.',
        detalhes: mensagensErro,
      });
    }

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

    // Converte imagem para base64, igual ao controller do usuário
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
 * Remove a resposta de uma reclamação
 * @param {Object} req - Objeto de requisição
 * @param {Object} res - Objeto de resposta
 * @returns {JSON} Mensagem de sucesso ou erro
 */
export const removerResposta = async (req, res) => {
  try {
    const { id } = req.params;

    const reclamacao = await Reclamacao.findByIdAndUpdate(
      id,
      { $unset: { resposta: '' }, status: 'aberta' },
      { new: true }
    );

    if (!reclamacao) {
      return res.status(404).json({ msg: 'Reclamação não encontrada' });
    }

    res.status(200).json({ msg: 'Resposta removida com sucesso' });
  } catch (error) {
    console.error('Erro ao remover resposta:', error);
    res.status(500).json({
      msg: 'Erro interno do servidor ao remover resposta',
      error: error.message,
    });
  }
};

/**
 * 🌟 SISTEMA DE AVALIAÇÃO DE RECLAMAÇÕES
 * Permite aos clientes avaliar a qualidade das respostas das empresas
 *
 * REGRAS DE NEGÓCIO:
 * ✅ Apenas o autor da reclamação pode avaliar
 * ✅ Reclamação deve ter sido respondida
 * ✅ Não pode avaliar duas vezes a mesma reclamação
 * ✅ Estrelas obrigatórias (1-5)
 * ✅ Problema resolvido obrigatório
 * ✅ Comentário opcional (min 10 chars se preenchido)
 *
 * @param {Object} req - Objeto de requisição
 * @param {Object} res - Objeto de resposta
 * @returns {JSON} Reclamação atualizada com avaliação ou erro
 */
export const avaliarReclamacao = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioId = req.user.id;
    const { estrelas, problemaResolvido, comentario } = req.body;

    /**
     * VALIDAÇÃO 1: Dados obrigatórios
     * Estrelas e status de problema resolvido são essenciais
     */
    if (!estrelas || typeof problemaResolvido !== 'boolean') {
      return res.status(400).json({
        msg: 'Avaliação por estrelas (1-5) e status do problema (resolvido/não resolvido) são obrigatórios',
        dadosRecebidos: { estrelas, problemaResolvido, comentario },
      });
    }

    /**
     * VALIDAÇÃO 2: Range de estrelas
     * Deve estar entre 1 e 5, sendo número inteiro
     */
    if (!Number.isInteger(estrelas) || estrelas < 1 || estrelas > 5) {
      return res.status(400).json({
        msg: 'A avaliação deve ser um número inteiro entre 1 e 5 estrelas',
        valorRecebido: estrelas,
      });
    }

    /**
     * VALIDAÇÃO 3: Comentário (se preenchido)
     * Deve ter pelo menos 10 caracteres se fornecido
     */
    if (
      comentario &&
      comentario.trim().length > 0 &&
      comentario.trim().length < 10
    ) {
      return res.status(400).json({
        msg: 'Se preenchido, o comentário deve ter pelo menos 10 caracteres',
        tamanhoAtual: comentario.trim().length,
      });
    }

    /**
     * VALIDAÇÃO 4: Reclamação existe
     * Busca a reclamação com dados do usuário para validações
     */
    const reclamacao = await Reclamacao.findById(id).populate(
      'user',
      'nome email'
    );

    if (!reclamacao) {
      return res.status(404).json({
        msg: 'Reclamação não encontrada',
        reclamacaoId: id,
      });
    }

    /**
     * VALIDAÇÃO 5: Autorização do usuário
     * Apenas o autor da reclamação pode avaliar
     */
    if (reclamacao.user._id.toString() !== usuarioId) {
      return res.status(403).json({
        msg: 'Apenas o autor da reclamação pode avaliar a resposta',
        autorReclamacao: reclamacao.user.nome,
        usuarioLogado: req.user.nome,
      });
    }

    /**
     * VALIDAÇÃO 6: Reclamação foi respondida
     * Não pode avaliar uma reclamação sem resposta
     */
    if (!reclamacao.resposta || !reclamacao.resposta.texto) {
      return res.status(400).json({
        msg: 'Não é possível avaliar uma reclamação que ainda não foi respondida',
        statusReclamacao: reclamacao.status,
        possuiResposta: !!reclamacao.resposta,
      });
    }

    /**
     * VALIDAÇÃO 7: Não foi avaliada anteriormente
     * Evita avaliações duplicadas
     */
    if (reclamacao.avaliacao && reclamacao.avaliacao.estrelas) {
      return res.status(400).json({
        msg: 'Esta reclamação já foi avaliada anteriormente',
        avaliacaoExistente: {
          estrelas: reclamacao.avaliacao.estrelas,
          problemaResolvido: reclamacao.avaliacao.problemaResolvido,
          dataAvaliacao: reclamacao.avaliacao.dataAvaliacao,
        },
      });
    }

    /**
     * PROCESSAMENTO: Criar objeto de avaliação
     * Estrutura os dados conforme o schema do modelo
     */
    const novaAvaliacao = {
      estrelas: estrelas,
      problemaResolvido: problemaResolvido,
      dataAvaliacao: new Date(),
    };

    // Adiciona comentário apenas se foi fornecido e não está vazio
    if (comentario && comentario.trim().length > 0) {
      novaAvaliacao.comentario = comentario.trim();
    }

    /**
     * PERSISTÊNCIA: Atualizar reclamação
     * Salva avaliação e atualiza status se necessário
     */
    const reclamacaoAtualizada = await Reclamacao.findByIdAndUpdate(
      id,
      {
        avaliacao: novaAvaliacao,
        // Atualiza status para 'fechada' se problema foi resolvido
        status: problemaResolvido ? 'fechada' : 'respondida',
      },
      { new: true, runValidators: true }
    )
      .populate('user', 'nome email')
      .populate('empresa', 'nome');

    /**
     * RESPOSTA DE SUCESSO
     * Retorna dados completos para atualização do frontend
     */
    res.status(200).json({
      msg: `Avaliação registrada com sucesso! ${estrelas} ${
        estrelas === 1 ? 'estrela' : 'estrelas'
      }`,
      reclamacao: {
        id: reclamacaoAtualizada._id,
        titulo: reclamacaoAtualizada.titulo,
        status: reclamacaoAtualizada.status,
        avaliacao: reclamacaoAtualizada.avaliacao,
        autor: reclamacaoAtualizada.user.nome,
        empresa: reclamacaoAtualizada.empresa.nome,
      },
      avaliacaoDetalhes: {
        estrelas: novaAvaliacao.estrelas,
        problemaResolvido: novaAvaliacao.problemaResolvido,
        temComentario: !!novaAvaliacao.comentario,
        statusAtualizado: reclamacaoAtualizada.status,
      },
    });
  } catch (error) {
    console.error('❌ Erro ao avaliar reclamação:', error);
    res.status(500).json({
      msg: 'Erro interno do servidor ao registrar avaliação',
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
};
