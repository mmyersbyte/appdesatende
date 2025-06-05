import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Empresa from '../models/Empresa.js';

export default async function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'Token não fornecido.' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Checa se o token expirou explicitamente (exp é timestamp em segundos)
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      return res.status(401).json({ msg: 'Token expirado.' });
    }

    // Garante que o tipo está presente no token
    if (
      !decoded.tipo ||
      (decoded.tipo !== 'user' && decoded.tipo !== 'empresa')
    ) {
      return res
        .status(401)
        .json({ msg: 'Tipo de usuário inválido no token.' });
    }

    // Tenta buscar como usuário
    let user = await User.findById(decoded.id);
    if (!user) {
      // Se não for user, tenta buscar como empresa
      user = await Empresa.findById(decoded.id);
      if (!user)
        return res.status(401).json({ msg: 'Usuário/Empresa não encontrado.' });
    }

    // Se existir campo 'ativo', bloqueia inativos
    if (user.ativo === false) {
      return res.status(403).json({ msg: 'Usuário/Empresa inativo.' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token inválido.' });
  }
}
