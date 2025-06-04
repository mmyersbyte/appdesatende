import express from 'express';
import {
  criarReclamacao,
  listarReclamacoesPorUsuario,
  listarReclamacoesPorEmpresa,
  getReclamacaoPorId,
  editarReclamacao,
  deletarReclamacao,
  responderReclamacao,
  removerResposta,
} from '../controllers/reclamacao.Controller.js';
import auth from '../middlewares/auth.js'; // Importe o middleware
import upload from '../middlewares/upload.js'; // Importa o upload

const router = express.Router();

// Rotas principais
router.use(auth);

router.post('/', upload.single('imagem'), criarReclamacao);
router.get('/meu-perfil', listarReclamacoesPorUsuario);

router.get('/empresa', listarReclamacoesPorEmpresa);
router.get('/:id', getReclamacaoPorId);
router.patch('/:id', editarReclamacao);
router.delete('/:id', deletarReclamacao);
router.patch('/:id/responder', responderReclamacao);
router.delete('/:id/remover-resposta', removerResposta);

export default router;
