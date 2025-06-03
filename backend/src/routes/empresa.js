import express from 'express';
import {
  cadastrarEmpresa,
  listarEmpresas,
} from '../controllers/empresa.Controller.js';
import { loginEmpresa } from '../controllers/authEmpresa.Controller.js';
const router = express.Router();

router.get('/listar-empresas', listarEmpresas);
router.post('/cadastrar', cadastrarEmpresa);
router.post('/login', loginEmpresa);

export default router;
