import express from 'express';
import userRoutes from './routes/user.js';
import empresaRoutes from './routes/empresa.js';
const app = express();

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

app.use('/api/empresas', empresaRoutes);
app.use('/api/users', userRoutes);

export default app;
