import { assert, test, describe } from 'poku';
import {
  loginSchema,
  cadastroUsuarioSchema,
  cadastroEmpresaSchema,
} from '../src/validators/authValidators.js';
import {
  criarReclamacaoSchema,
  responderReclamacaoSchema,
  avaliarReclamacaoSchema,
} from '../src/validators/reclamacaoValidators.js';

describe('Testes Unitários de Validação Joi', () => {
  // ========== TESTES PARA VALIDADORES DE AUTENTICAÇÃO ==========

  describe('Login Schema', () => {
    test('Deve aceitar dados válidos de login', async () => {
      const dadosValidos = {
        email: 'usuario@teste.com',
        senha: '123456',
      };

      const { error } = loginSchema.validate(dadosValidos);
      assert(!error, 'Não deve ter erro para dados válidos');
    });

    test('Deve falhar com email inválido', async () => {
      const dadosInvalidos = {
        email: 'email-sem-formato-valido',
        senha: '123456',
      };

      const { error } = loginSchema.validate(dadosInvalidos);
      assert(error, 'Deve ter erro para email inválido');
      assert(
        error.details[0].message.includes('e-mail'),
        'Mensagem deve mencionar e-mail inválido'
      );
    });

    test('Deve falhar sem email', async () => {
      const dadosInvalidos = {
        senha: '123456',
      };

      const { error } = loginSchema.validate(dadosInvalidos);
      assert(error, 'Deve ter erro quando email ausente');
      assert(
        error.details[0].message.includes('obrigatório'),
        'Mensagem deve mencionar que é obrigatório'
      );
    });

    test('Deve falhar com senha muito curta', async () => {
      const dadosInvalidos = {
        email: 'usuario@teste.com',
        senha: '123',
      };

      const { error } = loginSchema.validate(dadosInvalidos);
      assert(error, 'Deve ter erro para senha muito curta');
      assert(
        error.details[0].message.includes('6 caracteres'),
        'Mensagem deve mencionar mínimo de 6 caracteres'
      );
    });
  });

  describe('Cadastro de Usuário Schema', () => {
    test('Deve aceitar dados válidos de usuário', async () => {
      const dadosValidos = {
        nome: 'João Silva',
        email: 'joao@teste.com',
        senha: '123456',
        confirmarSenha: '123456',
      };

      const { error } = cadastroUsuarioSchema.validate(dadosValidos);
      assert(!error, 'Não deve ter erro para dados válidos');
    });

    test('Deve falhar com nome contendo números', async () => {
      const dadosInvalidos = {
        nome: 'João123',
        email: 'joao@teste.com',
        senha: '123456',
        confirmarSenha: '123456',
      };

      const { error } = cadastroUsuarioSchema.validate(dadosInvalidos);
      assert(error, 'Deve ter erro para nome com números');
      assert(
        error.details[0].message.includes('letras'),
        'Mensagem deve mencionar apenas letras'
      );
    });

    test('Deve falhar com senhas diferentes', async () => {
      const dadosInvalidos = {
        nome: 'João Silva',
        email: 'joao@teste.com',
        senha: '123456',
        confirmarSenha: '654321',
      };

      const { error } = cadastroUsuarioSchema.validate(dadosInvalidos);
      assert(error, 'Deve ter erro para senhas diferentes');
      assert(
        error.details[0].message.includes('coincidem'),
        'Mensagem deve mencionar que senhas não coincidem'
      );
    });
  });

  describe('Cadastro de Empresa Schema', () => {
    test('Deve aceitar nome de empresa com números e símbolos permitidos', async () => {
      const dadosValidos = {
        nome: 'Empresa XYZ 123 Ltda.',
        email: 'empresa@teste.com',
        senha: '123456',
      };

      const { error } = cadastroEmpresaSchema.validate(dadosValidos);
      assert(!error, 'Não deve ter erro para nome válido de empresa');
    });

    test('Deve falhar com caracteres especiais não permitidos', async () => {
      const dadosInvalidos = {
        nome: 'Empresa@#$%',
        email: 'empresa@teste.com',
        senha: '123456',
      };

      const { error } = cadastroEmpresaSchema.validate(dadosInvalidos);
      assert(error, 'Deve ter erro para caracteres especiais inválidos');
    });
  });

  // ========== TESTES PARA VALIDADORES DE RECLAMAÇÃO ==========

  describe('Criar Reclamação Schema', () => {
    test('Deve aceitar dados válidos de reclamação', async () => {
      const dadosValidos = {
        titulo: 'Problema com produto',
        descricao: 'Descrição detalhada do problema encontrado',
        empresa: '507f1f77bcf86cd799439011', // ObjectId válido
        contato: 'usuario@teste.com',
      };

      const { error } = criarReclamacaoSchema.validate(dadosValidos);
      assert(!error, 'Não deve ter erro para dados válidos');
    });

    test('Deve falhar com título muito curto', async () => {
      const dadosInvalidos = {
        titulo: 'Abc',
        descricao: 'Descrição detalhada do problema',
        empresa: '507f1f77bcf86cd799439011',
        contato: 'usuario@teste.com',
      };

      const { error } = criarReclamacaoSchema.validate(dadosInvalidos);
      assert(error, 'Deve ter erro para título muito curto');
      assert(
        error.details[0].message.includes('5 caracteres'),
        'Mensagem deve mencionar mínimo de 5 caracteres'
      );
    });

    test('Deve aceitar contato como WhatsApp válido', async () => {
      const dadosValidos = {
        titulo: 'Problema com produto',
        descricao: 'Descrição detalhada do problema',
        empresa: '507f1f77bcf86cd799439011',
        contato: '(11)99999-9999',
      };

      const { error } = criarReclamacaoSchema.validate(dadosValidos);
      assert(!error, 'Não deve ter erro para WhatsApp válido');
    });

    test('Deve falhar com contato inválido', async () => {
      const dadosInvalidos = {
        titulo: 'Problema com produto',
        descricao: 'Descrição detalhada do problema',
        empresa: '507f1f77bcf86cd799439011',
        contato: 'contato-invalido',
      };

      const { error } = criarReclamacaoSchema.validate(dadosInvalidos);
      assert(error, 'Deve ter erro para contato inválido');
    });
  });

  describe('Responder Reclamação Schema', () => {
    test('Deve aceitar resposta válida', async () => {
      const dadosValidos = {
        texto: 'Resposta detalhada da empresa para resolver o problema',
      };

      const { error } = responderReclamacaoSchema.validate(dadosValidos);
      assert(!error, 'Não deve ter erro para resposta válida');
    });

    test('Deve falhar com resposta muito curta', async () => {
      const dadosInvalidos = {
        texto: 'Ok',
      };

      const { error } = responderReclamacaoSchema.validate(dadosInvalidos);
      assert(error, 'Deve ter erro para resposta muito curta');
      assert(
        error.details[0].message.includes('10 caracteres'),
        'Mensagem deve mencionar mínimo de 10 caracteres'
      );
    });
  });

  describe('Avaliar Reclamação Schema', () => {
    test('Deve aceitar avaliação válida', async () => {
      const dadosValidos = {
        estrelas: 4,
        problemaResolvido: true,
        comentario: 'Problema foi resolvido satisfatoriamente',
      };

      const { error } = avaliarReclamacaoSchema.validate(dadosValidos);
      assert(!error, 'Não deve ter erro para avaliação válida');
    });

    test('Deve falhar com estrelas inválidas', async () => {
      const dadosInvalidos = {
        estrelas: 6,
        problemaResolvido: true,
      };

      const { error } = avaliarReclamacaoSchema.validate(dadosInvalidos);
      assert(error, 'Deve ter erro para estrelas > 5');
      assert(
        error.details[0].message.includes('5 estrelas'),
        'Mensagem deve mencionar máximo de 5 estrelas'
      );
    });

    test('Deve falhar com comentário muito curto', async () => {
      const dadosInvalidos = {
        estrelas: 3,
        problemaResolvido: false,
        comentario: 'Ruim',
      };

      const { error } = avaliarReclamacaoSchema.validate(dadosInvalidos);
      assert(error, 'Deve ter erro para comentário muito curto');
      assert(
        error.details[0].message.includes('10 caracteres'),
        'Mensagem deve mencionar mínimo de 10 caracteres'
      );
    });

    test('Deve aceitar avaliação sem comentário', async () => {
      const dadosValidos = {
        estrelas: 2,
        problemaResolvido: false,
      };

      const { error } = avaliarReclamacaoSchema.validate(dadosValidos);
      assert(!error, 'Não deve ter erro para avaliação sem comentário');
    });
  });
});
