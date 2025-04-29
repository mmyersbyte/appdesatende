import mongoose from 'mongoose';

const empresaSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    tipo: { type: String, enum: ['empresa'], default: 'empresa' },
  },
  { timestamps: true }
);

export default mongoose.model('Empresa', empresaSchema);
