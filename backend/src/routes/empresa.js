import express from 'express';
import {
  cadastrarEmpresa,
  listarEmpresas,
  buscarEmpresaPorId,
} from '../controllers/empresa.Controller.js';
import { loginEmpresa } from '../controllers/authEmpresa.Controller.js';
import auth from '../middlewares/auth.js';
import { validateBody } from '../middlewares/validate.js';
import { loginSchema } from '../validators/authValidator.js';
import { registerSchema } from '../validators/registerValidator.js';
const router = express.Router();

router.get('/listar-empresas', auth, listarEmpresas);
router.get('/:id', auth, buscarEmpresaPorId);

router.post('/cadastrar', validateBody(registerSchema), cadastrarEmpresa);
router.post('/login', validateBody(loginSchema), loginEmpresa);

export default router;
