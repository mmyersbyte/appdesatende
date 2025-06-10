import express from 'express';
import userRoutes from './routes/user.js';
import empresaRoutes from './routes/empresa.js';
import reclamacaoRoutes from './routes/reclamacao.js';
import { limiter } from './middlewares/rateLimiter.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';
import setupSwagger from '../swagger/swagger.js';
const app = express();

// Sem CORS pq o front é RN
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '2mb' }));
app.use(limiter);
app.use('/api/empresas', empresaRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reclamacoes', reclamacaoRoutes);
setupSwagger(app);
app.use(notFoundHandler);
app.use(errorHandler);
export default app;
