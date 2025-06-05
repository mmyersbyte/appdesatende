import express from 'express';
import {
  cadastrarUsuario,
  listarUsuarios,
} from '../controllers/user.Controller.js';
import { loginUser } from '../controllers/authUser.Controller.js';
import auth from '../middlewares/auth.js';
import { validateBody } from '../middlewares/validate.js';
import { loginSchema } from '../validators/authValidator.js';
import { registerSchema } from '../validators/registerValidator.js';
const router = express.Router();

router.post('/login', validateBody(loginSchema), loginUser);
router.post('/cadastrar', validateBody(registerSchema), cadastrarUsuario);
router.get('/listar-usuarios', auth, listarUsuarios);

export default router;
