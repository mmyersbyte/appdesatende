import Joi from 'joi';

// Validator para login (usuário e empresa)
export const loginSchema = Joi.object({
  email: Joi.string()
    .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .required()
    .messages({
      'string.pattern.base': 'Formato de e-mail inválido',
      'any.required': 'O email é obrigatório',
    }),

  senha: Joi.string().min(6).required().messages({
    'string.min': 'A senha deve ter no mínimo 6 caracteres',
    'any.required': 'A senha é obrigatória',
  }),
});

// Validator para cadastro de usuário
export const cadastroUsuarioSchema = Joi.object({
  nome: Joi.string()
    .trim()
    .min(2)
    .pattern(/^[a-zA-ZÀ-ÿ\s]+$/)
    .required()
    .messages({
      'string.min': 'O nome deve ter no mínimo 2 caracteres',
      'string.pattern.base': 'O nome deve conter apenas letras e espaços',
      'any.required': 'O nome é obrigatório',
    }),

  email: Joi.string()
    .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .required()
    .messages({
      'string.pattern.base': 'Formato de e-mail inválido',
      'any.required': 'O email é obrigatório',
    }),

  senha: Joi.string().min(6).required().messages({
    'string.min': 'A senha deve ter no mínimo 6 caracteres',
    'any.required': 'A senha é obrigatória',
  }),

  confirmarSenha: Joi.string().valid(Joi.ref('senha')).required().messages({
    'any.only': 'As senhas não coincidem',
    'any.required': 'A confirmação de senha é obrigatória',
  }),

  tipo: Joi.string().valid('user').default('user'),
});

// Validator para cadastro de empresa
export const cadastroEmpresaSchema = Joi.object({
  nome: Joi.string()
    .trim()
    .min(2)
    .pattern(/^[a-zA-ZÀ-ÿ0-9\s\-\.]+$/)
    .required()
    .messages({
      'string.min': 'O nome deve ter no mínimo 2 caracteres',
      'string.pattern.base':
        'O nome deve conter apenas letras, números, espaços, hífen e ponto',
      'any.required': 'O nome é obrigatório',
    }),

  email: Joi.string()
    .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .required()
    .messages({
      'string.pattern.base': 'Formato de e-mail inválido',
      'any.required': 'O email é obrigatório',
    }),

  senha: Joi.string().min(6).required().messages({
    'string.min': 'A senha deve ter no mínimo 6 caracteres',
    'any.required': 'A senha é obrigatória',
  }),

  tipo: Joi.string().valid('empresa').default('empresa'),
});
