// Middleware global para tratamento de erros
export default function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  res.status(status).json({
    msg: err.message || 'Erro interno do servidor',
    status,
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString(),
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
}
