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
  avaliarReclamacao,
} from '../controllers/reclamacao.Controller.js';
import auth from '../middlewares/auth.js';
import upload from '../middlewares/upload.js';
import { validateBody } from '../middlewares/validate.js';
import {
  criarReclamacaoSchema,
  responderReclamacaoSchema,
  avaliarReclamacaoSchema,
} from '../validators/reclamacaoValidators.js';

const router = express.Router();

// Rotas principais
router.use(auth);

router.post(
  '/',
  upload.single('imagem'),
  validateBody(criarReclamacaoSchema),
  criarReclamacao
);
router.get('/meu-perfil', listarReclamacoesPorUsuario);

router.get('/empresa', listarReclamacoesPorEmpresa);
router.get('/:id', getReclamacaoPorId);
router.patch('/:id', editarReclamacao);
router.delete('/:id', deletarReclamacao);
router.patch(
  '/:id/responder',
  validateBody(responderReclamacaoSchema),
  responderReclamacao
);
router.delete('/:id/remover-resposta', removerResposta);

router.post(
  '/:id/avaliar',
  validateBody(avaliarReclamacaoSchema),
  avaliarReclamacao
);

export default router;
