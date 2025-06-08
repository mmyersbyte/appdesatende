import Joi from 'joi';

export const criarReclamacaoSchema = Joi.object({
  titulo: Joi.string().trim().min(5).max(100).required().messages({
    'string.min': 'O título deve ter no mínimo 5 caracteres',
    'string.max': 'O título deve ter no máximo 100 caracteres',
    'any.required': 'O título é obrigatório',
  }),

  descricao: Joi.string().trim().min(10).max(1000).required().messages({
    'string.min': 'A descrição deve ter no mínimo 10 caracteres',
    'string.max': 'A descrição deve ter no máximo 1000 caracteres',
    'any.required': 'A descrição é obrigatória',
  }),

  empresa: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      'string.pattern.base': 'ID da empresa inválido',
      'any.required': 'A empresa é obrigatória',
    }),

  // Campo contato - aceita email ou zapzap
  contato: Joi.string()
    .trim()
    .max(100)
    .pattern(
      /^(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|(?:\+?55\s?)?(?:\(?\d{2}\)?[\s-]?)(?:9\d{4}[\s-]?\d{4}|\d{4}[\s-]?\d{4}))$/
    )
    .required()
    .messages({
      'string.pattern.base':
        'Contato deve ser um email válido ou WhatsApp no formato correto',
      'string.max': 'Contato deve ter no máximo 100 caracteres',
      'any.required': 'O contato é obrigatório',
    }),

  // Campo imagem - opcional, aceita formatos comuns
  imagem: Joi.object({
    data: Joi.binary().optional(),
    contentType: Joi.string()
      .pattern(/^image\/(jpeg|jpg|png|gif|webp)$/)
      .optional()
      .messages({
        'string.pattern.base':
          'Formato de imagem inválido. Use: jpeg, jpg, png, gif ou webp',
      }),
  }).optional(),
});

// Validator para responder reclamação
export const responderReclamacaoSchema = Joi.object({
  texto: Joi.string().trim().min(10).max(1000).required().messages({
    'string.min': 'A resposta deve ter no mínimo 10 caracteres',
    'string.max': 'A resposta deve ter no máximo 1000 caracteres',
    'any.required': 'O texto da resposta é obrigatório',
  }),
});

// Validator para avaliar reclamação
export const avaliarReclamacaoSchema = Joi.object({
  estrelas: Joi.number().integer().min(1).max(5).required().messages({
    'number.base': 'As estrelas devem ser um número',
    'number.integer': 'As estrelas devem ser um número inteiro',
    'number.min': 'A avaliação deve ter pelo menos 1 estrela',
    'number.max': 'A avaliação deve ter no máximo 5 estrelas',
    'any.required': 'A avaliação por estrelas é obrigatória',
  }),

  problemaResolvido: Joi.boolean().required().messages({
    'boolean.base': 'Problema resolvido deve ser verdadeiro ou falso',
    'any.required': 'É obrigatório informar se o problema foi resolvido',
  }),

  comentario: Joi.string().trim().min(10).max(500).optional().messages({
    'string.min': 'O comentário deve ter no mínimo 10 caracteres',
    'string.max': 'O comentário deve ter no máximo 500 caracteres',
  }),
});
