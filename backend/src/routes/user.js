import express from 'express';
import {
  cadastrarUsuario,
  listarUsuarios,
} from '../controllers/user.Controller.js';
import { loginUser } from '../controllers/authUser.Controller.js';
const router = express.Router();

router.post('/login', loginUser);
router.post('/cadastrar', cadastrarUsuario);
router.get('/listar-usuarios', listarUsuarios);

export default router;
