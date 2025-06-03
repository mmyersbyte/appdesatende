import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import app from './src/app.js';

dotenv.config();

connectDB(process.env.MONGODB_URI); // meu tratamento de erro é direto no config/db.js

app.listen(5000, '0.0.0.0', () => {
  console.log('Servidor rodando!');
});
