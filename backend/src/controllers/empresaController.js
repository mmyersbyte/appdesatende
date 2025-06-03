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
