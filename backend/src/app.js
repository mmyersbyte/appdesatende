import express from 'express';
import userRoutes from './routes/user.js';
import empresaRoutes from './routes/empresa.js';
import reclamacaoRoutes from './routes/reclamacao.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

app.use('/api/empresas', empresaRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reclamacoes', reclamacaoRoutes);

app.use(notFoundHandler); // Para rotas não encontradas
app.use(errorHandler); // Para erros globais
export default app;
