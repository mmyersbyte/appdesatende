import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist)
      return res.status(400).json({ message: 'Email já cadastrado' });
    const hashedSenha = await bcrypt.hash(senha, 10);
    const user = new User({ nome, email, senha: hashedSenha });
    await user.save();
    res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Erro ao cadastrar usuário', error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: 'Usuário não encontrado' });
    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) return res.status(400).json({ message: 'Senha incorreta' });
    res.status(200).json({
      message: 'Login realizado com sucesso',
      user: {
        id: user._id,
        nome: user.nome,
        email: user.email,
        tipo: user.tipo,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Erro ao fazer login', error: err.message });
  }
};
