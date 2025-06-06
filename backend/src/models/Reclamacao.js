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

    /**
     * Campo de contato para comunicação direta entre empresa e cliente
     * Aceita email ou WhatsApp seguindo padrões internacionais
     * Implementa validação dual para maior flexibilidade
     */
    contato: {
      type: String,
      trim: true,
      maxlength: [100, 'Contato deve ter no máximo 100 caracteres.'],
      validate: {
        validator: function (valor) {
          // Permite campo vazio (opcional)
          if (!valor) return true;

          // Regex para validação de email (RFC 5322 simplificado)
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

          // Regex para validação de WhatsApp (formato internacional e nacional)
          // Aceita: +5511999999999, 11999999999, (11)99999-9999
          const whatsappRegex =
            /^(?:\+?55\s?)?(?:\(?\d{2}\)?[\s-]?)(?:9\d{4}[\s-]?\d{4}|\d{4}[\s-]?\d{4})$/;

          return emailRegex.test(valor) || whatsappRegex.test(valor);
        },
        message:
          'Contato deve ser um email válido ou WhatsApp no formato correto.',
      },
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

    /**
     * Sistema de avaliação da resposta da empresa
     * Permite aos clientes avaliar a qualidade do atendimento recebido
     * Só pode ser preenchido após a empresa responder à reclamação
     */
    avaliacao: {
      /**
       * Classificação por estrelas (1-5)
       * Representa a satisfação geral com a resposta
       */
      estrelas: {
        type: Number,
        min: [1, 'A avaliação deve ter pelo menos 1 estrela.'],
        max: [5, 'A avaliação deve ter no máximo 5 estrelas.'],
        validate: {
          validator: function (valor) {
            // Valida se é um número inteiro
            return Number.isInteger(valor);
          },
          message: 'A avaliação deve ser um número inteiro entre 1 e 5.',
        },
      },

      /**
       * Indicador se o problema foi resolvido
       * Métrica importante para avaliar eficácia da resolução
       */
      problemaResolvido: {
        type: Boolean,
        required: function () {
          // Obrigatório apenas se há avaliação por estrelas
          return this.avaliacao && this.avaliacao.estrelas;
        },
      },

      /**
       * Comentário opcional sobre a resposta
       * Feedback qualitativo complementar à avaliação quantitativa
       */
      comentario: {
        type: String,
        trim: true,
        maxlength: [500, 'O comentário deve ter no máximo 500 caracteres.'],
        validate: {
          validator: function (valor) {
            // Se preenchido, deve ter pelo menos 10 caracteres
            if (valor && valor.trim().length > 0) {
              return valor.trim().length >= 10;
            }
            return true; // Campo opcional
          },
          message:
            'O comentário deve ter pelo menos 10 caracteres se preenchido.',
        },
      },

      /**
       * Timestamp da avaliação
       * Importante para análises temporais e auditoria
       */
      dataAvaliacao: {
        type: Date,
        default: function () {
          // Só define data se há estrelas (indica que foi avaliado)
          return this.avaliacao && this.avaliacao.estrelas
            ? Date.now()
            : undefined;
        },
      },
    },
  },
  {
    timestamps: true, // cria createdAt e updatedAt automaticamente
  }
);

/**
 * Middleware pré-save para sanitização adicional do campo contato
 * Garante consistência dos dados antes da persistência
 */
reclamacaoSchema.pre('save', function (next) {
  if (this.contato) {
    // Remove espaços extras e caracteres especiais desnecessários
    this.contato = this.contato.trim().replace(/\s+/g, ' ');

    // Normaliza WhatsApp para formato padrão (+55XXXXXXXXXXX)
    if (!/^[a-zA-Z0-9._%+-]+@/.test(this.contato)) {
      // Remove todos os caracteres não numéricos
      const numeros = this.contato.replace(/\D/g, '');

      // Adiciona código do país se não existir
      if (numeros.length === 11 && numeros.startsWith('1')) {
        this.contato = `+55${numeros}`;
      } else if (numeros.length === 10) {
        this.contato = `+55${numeros}`;
      }
    }
  }
  next();
});

const Reclamacao = mongoose.model('Reclamacao', reclamacaoSchema);

export default Reclamacao;
