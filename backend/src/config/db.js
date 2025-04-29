import mongoose from 'mongoose';

export default function connectDB(uri) {
  mongoose.connection.on('connected', () => {
    console.log('MongoDB conectado com sucesso!');
  });
  mongoose.connection.on('error', (error) => {
    console.error('Erro ao conectar no MongoDB:', error);
    process.exit(1);
  });
  mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB desconectado!');
  });
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
