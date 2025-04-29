import express from 'express';
import mongoose from 'mongoose';
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

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB conectado');
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  })
  .catch((err) => console.error('Erro ao conectar no MongoDB:', err));
