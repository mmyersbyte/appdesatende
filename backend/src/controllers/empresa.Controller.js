import Empresa from '../models/Empresa.js';

export const cadastrarEmpresa = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
      return res.status(400).json({
        message: 'O nome, email e senha não podem ficar em branco',
      });
    }
    const empresaJaExistente = await Empresa.findOne({ email });
    if (empresaJaExistente) {
      return res
        .status(409)
        .json({ message: 'Já existe um usuário com este email.' });
    }
    const novaEmpresa = new Empresa({ nome, email, senha });
    await novaEmpresa.save();
    const empresaRetorno = novaEmpresa.toJSON();

    return res.status(201).json({
      empresa: empresaRetorno,
      message: 'Empresa cadastrada com sucesso!',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Deu ruim!',
      error: error.message,
    });
  }
};

export const listarEmpresas = async (req, res) => {
  try {
    const empresas = await Empresa.find().select('-senha');
    return res.status(200).json({ empresas });
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao buscar empresas.',
      error: error.message,
    });
  }
};

export const buscarEmpresaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const empresa = await Empresa.findById(id);
    if (!empresa) {
      return res.status(404).json({ message: 'Empresa não encontrada.' });
    }
    return res.status(200).json(empresa);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Erro ao buscar empresa.', error: error.message });
  }
};
