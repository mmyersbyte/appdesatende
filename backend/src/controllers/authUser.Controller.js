import User from '../models/User.js';

export const loginUser = async (req, res) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res
        .status(400)
        .json({ message: 'Email e senha são obrigatórios.' });
    }

    // Busca a user pelo email e inclui a senha (select: false no schema)
    const user = await User.findOne({ email }).select('+senha');
    if (!user) {
      return res.status(401).json({ message: 'Email ou senha inválidos.' });
    }

    // Verifica a senha
    const senhaCorreta = await user.verificaSenha(senha);
    if (!senhaCorreta) {
      return res.status(401).json({ message: 'Email ou senha inválidos.' });
    }

    // Gera o token JWT usando o método do model
    const token = user.gerarTokenJWT();

    // Remove a senha do objeto retornado
    const userRetorno = user.toJSON();

    return res.status(200).json({
      user: userRetorno,
      token,
      message: 'Login realizado com sucesso!',
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Erro ao fazer login.', error: error.message });
  }
};
