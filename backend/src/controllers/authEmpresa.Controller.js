import Empresa from '../models/Empresa.js';

export const loginEmpresa = async (req, res) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res
        .status(400)
        .json({ message: 'Email e senha são obrigatórios.' });
    }

    // Busca a empresa pelo email e inclui a senha (select: false no schema)
    const empresa = await Empresa.findOne({ email }).select('+senha');
    if (!empresa) {
      return res.status(401).json({ message: 'Email ou senha inválidos.' });
    }

    // Verifica a senha
    const senhaCorreta = await empresa.verificaSenha(senha);
    if (!senhaCorreta) {
      return res.status(401).json({ message: 'Email ou senha inválidos.' });
    }

    // Gera o token JWT usando o método do model
    const token = empresa.gerarTokenJWT();

    // Remove a senha do objeto retornado
    const empresaRetorno = empresa.toJSON();

    return res.status(200).json({
      empresa: empresaRetorno,
      token,
      message: 'Login realizado com sucesso!',
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Erro ao fazer login.', error: error.message });
  }
};
