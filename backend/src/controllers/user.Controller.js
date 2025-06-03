import User from '../models/User.js';

export const cadastrarUsuario = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
      return res
        .status(400)
        .json({ message: 'Nome, email e senha são obrigatórios.' });
    }

    // Verifica se já existe usuário com o mesmo email
    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      return res
        .status(409)
        .json({ message: 'Já existe um usuário com este email.' });
    }

    // Cria o usuário
    const novoUsuario = new User({ nome, email, senha });
    await novoUsuario.save();

    // Remove a senha do retorno
    const usuarioRetorno = novoUsuario.toJSON();

    return res.status(201).json({
      user: usuarioRetorno,
      message: 'Usuário cadastrado com sucesso!',
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Erro ao cadastrar usuário.', error: error.message });
  }
};

export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await User.find().select('-senha');
    return res.status(200).json({ usuarios });
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao buscar empresas.',
      error: error.message,
    });
  }
};
