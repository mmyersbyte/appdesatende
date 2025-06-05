import Joi from 'joi';

const safeString = /^[^<>$"'`]*$/;

export const registerSchema = Joi.object({
  nome: Joi.string()
    .min(2)
    .max(100)
    .pattern(safeString)
    .trim()
    .required()
    .messages({
      'string.empty': 'Nome é obrigatório.',
      'any.required': 'Nome é obrigatório.',
      'string.min': 'Nome deve ter pelo menos 2 caracteres.',
      'string.max': 'Nome deve ter no máximo 100 caracteres.',
      'string.pattern.base': 'Nome contém caracteres não permitidos.',
    }),

  email: Joi.string().email().pattern(safeString).trim().required().messages({
    'string.empty': 'E-mail é obrigatório.',
    'any.required': 'E-mail é obrigatório.',
    'string.email': 'E-mail inválido.',
    'string.pattern.base': 'E-mail contém caracteres não permitidos.',
  }),

  senha: Joi.string().min(6).max(100).pattern(safeString).required().messages({
    'string.empty': 'Senha é obrigatória.',
    'any.required': 'Senha é obrigatória.',
    'string.min': 'Senha deve ter no mínimo 6 caracteres.',
    'string.max': 'Senha muito longa.',
    'string.pattern.base': 'Senha contém caracteres não permitidos.',
  }),

  tipo: Joi.string().valid('user', 'empresa').required().messages({
    'any.only': 'Tipo de usuário deve ser "user" ou "empresa".',
    'any.required': 'Tipo de usuário é obrigatório.',
  }),
});
