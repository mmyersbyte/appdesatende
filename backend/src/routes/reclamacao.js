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

/**
 * 🌟 SISTEMA DE AVALIAÇÃO DE RECLAMAÇÕES
 * Rota: POST /reclamacoes/:id/avaliar
 *
 * FUNCIONALIDADE:
 * ✅ Permite aos clientes avaliar respostas das empresas
 * ✅ Sistema de estrelas (1-5) + indicador problema resolvido
 * ✅ Comentário opcional para feedback qualitativo
 * ✅ Validações robustas de autorização e dados
 *
 * SEGURANÇA:
 * 🔒 Requer autenticação (middleware auth)
 * 🔒 Apenas autor da reclamação pode avaliar
 * 🔒 Validação de dados no controller
 */
router.post('/:id/avaliar', avaliarReclamacao);

export default router;
