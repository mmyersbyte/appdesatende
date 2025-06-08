import express from 'express';
import {
  cadastrarUsuario,
  listarUsuarios,
} from '../controllers/user.Controller.js';
import { loginUser } from '../controllers/authUser.Controller.js';
import { validateBody } from '../middlewares/validate.js';
import {
  loginSchema,
  cadastroUsuarioSchema,
} from '../validators/authValidators.js';

const router = express.Router();

router.post('/login', validateBody(loginSchema), loginUser);
router.post(
  '/cadastrar',
  validateBody(cadastroUsuarioSchema),
  cadastrarUsuario
);
router.get('/listar-usuarios', listarUsuarios);

export default router;
