// Middleware para rotas não encontradas (404)
export default function notFoundHandler(req, res, next) {
  res.status(404).json({
    msg: 'Rota não encontrada',
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString(),
  });
}
