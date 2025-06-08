/**
 * Middleware global de tratamento de erros para Express.js
 * - Sempre retorna status e mensagem amigável ao usuário
 * - Loga detalhes do erro no servidor para análise posterior
 * - Não expõe informações sensíveis na resposta da API
 * -
 */

export default function errorHandler(err, req, res, next) {
  // Se já enviou resposta, só repassa o erro
  if (res.headersSent) return next(err);

  // Log detalhado no servidor
  console.error(`--- ERRO [${new Date().toISOString()}] ---`);
  console.error(`Rota: ${req.method} ${req.originalUrl}`);
  console.error(`Corpo da requisição: ${JSON.stringify(req.body)}`);
  console.error(`Erro:`, err);

  res.status(err.status || 500).json({
    mensagem:
      err.message || 'Erro interno do servidor. Tente novamente mais tarde.',
  });
}
