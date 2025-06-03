import express from 'express';
import { cadastrarEmpresa } from '../controllers/empresaController.js';

const router = express.Router();

router.post('/cadastrar', cadastrarEmpresa);

export default router;
