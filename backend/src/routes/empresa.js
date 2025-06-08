import express from 'express';
import {
  cadastrarEmpresa,
  listarEmpresas,
  buscarEmpresaPorId,
} from '../controllers/empresa.Controller.js';
import { loginEmpresa } from '../controllers/authEmpresa.Controller.js';
import { validateBody } from '../middlewares/validate.js';
import {
  loginSchema,
  cadastroEmpresaSchema,
} from '../validators/authValidators.js';

const router = express.Router();

router.get('/listar-empresas', listarEmpresas);
router.get('/:id', buscarEmpresaPorId);
router.post(
  '/cadastrar',
  validateBody(cadastroEmpresaSchema),
  cadastrarEmpresa
);
router.post('/login', validateBody(loginSchema), loginEmpresa);

export default router;
