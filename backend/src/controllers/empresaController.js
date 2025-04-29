import Empresa from '../models/Empresa.js';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const empresaExist = await Empresa.findOne({ email });
    if (empresaExist)
      return res.status(400).json({ message: 'Email já cadastrado' });
    const hashedSenha = await bcrypt.hash(senha, 10);
    const empresa = new Empresa({ nome, email, senha: hashedSenha });
    await empresa.save();
    res.status(201).json({ message: 'Empresa cadastrada com sucesso' });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Erro ao cadastrar empresa', error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const empresa = await Empresa.findOne({ email });
    if (!empresa)
      return res.status(400).json({ message: 'Empresa não encontrada' });
    const isMatch = await bcrypt.compare(senha, empresa.senha);
    if (!isMatch) return res.status(400).json({ message: 'Senha incorreta' });
    res.status(200).json({
      message: 'Login realizado com sucesso',
      empresa: {
        id: empresa._id,
        nome: empresa.nome,
        email: empresa.email,
        tipo: empresa.tipo,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Erro ao fazer login', error: err.message });
  }
};
