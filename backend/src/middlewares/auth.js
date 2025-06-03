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

    // Tenta buscar como usuário
    let user = await User.findById(decoded.id);
    if (!user) {
      // Se não for user, tenta buscar como empresa
      user = await Empresa.findById(decoded.id);
      if (!user)
        return res.status(401).json({ msg: 'Usuário/Empresa não encontrado.' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token inválido.' });
  }
}
