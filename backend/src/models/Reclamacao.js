import mongoose from 'mongoose';

const reclamacaoSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: [true, 'O título da reclamação é obrigatório.'],
      trim: true,
    },

    descricao: {
      type: String,
      required: [true, 'A descrição da reclamação é obrigatória.'],
      trim: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'O autor da reclamação é obrigatório.'],
    },

    empresa: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Empresa',
      required: [true, 'A empresa alvo da reclamação é obrigatória.'],
    },

    imagem: {
      data: Buffer, // conteúdo da imagem
      contentType: String, // ex: 'image/jpeg', 'image/png'
    },

    resposta: {
      texto: {
        type: String,
        trim: true,
      },
      respondidoPor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Empresa',
      },
      data: {
        type: Date,
      },
    },

    status: {
      type: String,
      enum: ['aberta', 'respondida', 'fechada'],
      default: 'aberta',
    },
  },
  {
    timestamps: true, // cria createdAt e updatedAt automaticamente
  }
);

const Reclamacao = mongoose.model('Reclamacao', reclamacaoSchema);

export default Reclamacao;
