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

    contato: {
      type: String, // Pode ser e-mail ou número de WhatsApp
      trim: true,
      maxlength: 100,
      // Dica: validação mais rígida pode ser feita no controller/Joi
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

    avaliacao: {
      estrelas: {
        type: Number,
        min: 1,
        max: 5,
      },
      problemaResolvido: {
        type: Boolean,
      },
      comentario: {
        type: String,
        trim: true,
        maxlength: 500,
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
