import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';

import userRoutes from './routes/user.js';
import empresaRoutes from './routes/empresa.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/users', userRoutes);
app.use('/api/empresas', empresaRoutes);

const PORT = process.env.PORT || 6000;

connectDB(process.env.MONGODB_URI);

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
