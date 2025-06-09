# 🧪 Guia Completo de Testes - Poku + Supertest

## 📚 **O que é o Poku?**

O **Poku** é um executor de testes moderno e simples para Node.js que se destaca pela:

✅ **Simplicidade extrema** - Zero configuração  
✅ **Performance** - Rápido e leve  
✅ **Multi-plataforma** - Node.js, Bun, Deno  
✅ **ESM/CJS** - Suporte nativo  
✅ **Assert nativo** - Sem bibliotecas complexas

### 🔧 **Funcionalidades principais:**

- `assert()` - Verificações simples e claras
- `test()` - Testes individuais
- `describe()` - Agrupar testes relacionados
- `it()` - Alias para test() (compatibilidade)

---

## 🚀 **Como Executar os Testes**

### **Executar todos os testes:**

```bash
npm test
```

### **Executar testes específicos:**

```bash
# Apenas testes de autenticação
npm run test:auth

# Apenas testes de validação
npm run test:validators

# Apenas testes de reclamação
npm run test:reclamacao
```

### **Executar com modo watch (desenvolvimento):**

```bash
npm run test:watch
```

---

## 📂 **Estrutura dos Testes**

```
backend/tests/
├── auth.test.js           # Testes de autenticação e cadastro
├── validators.test.js     # Testes dos validators Joi
├── reclamacao.test.js     # Testes de reclamações
└── README.md             # Este guia
```

---

## 🧪 **Testes Implementados**

### **1. auth.test.js - Autenticação**

- ✅ Cadastro de usuário com sucesso
- ✅ Cadastro de empresa com sucesso
- ✅ Login de usuário com credenciais válidas
- ✅ Login de empresa com credenciais válidas
- ❌ Falha com email duplicado
- ❌ Falha com credenciais inválidas

### **2. validators.test.js - Validação Joi**

- ❌ Campos obrigatórios ausentes
- ❌ Email com formato inválido
- ❌ Senha muito curta (< 6 caracteres)
- ❌ Senhas não coincidem
- ❌ Nome com formato inválido (regex)
- ✅ Empresa com nome válido (números/símbolos)

### **3. reclamacao.test.js - Reclamações**

- ❌ Título/descrição muito curtos
- ❌ ID de empresa inválido
- ❌ Contato inválido
- ✅ Contato em formato de email
- ✅ Contato em formato WhatsApp
- ❌ Avaliação com estrelas inválidas
- ❌ Resposta com texto muito curto

---

## 🔍 **Como Funciona o Poku**

### **Assert simples:**

```javascript
import { assert } from 'poku';

assert(response.status === 200, 'Status deve ser 200');
assert(response.body.token, 'Token deve existir');
```

### **Organizando testes:**

```javascript
import { describe, test } from 'poku';

describe('Grupo de testes', () => {
  test('Teste individual', async () => {
    // Lógica do teste
  });
});
```

### **Com Supertest:**

```javascript
import request from 'supertest';
import app from '../src/app.js';

const response = await request(app)
  .post('/api/users/login')
  .send({ email: 'test@test.com', senha: '123456' });
```

---

## 📋 **Regex Validados nos Testes**

### **Email:**

`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`

- Formato básico de email
- Sem espaços, com @ e domínio

### **Nome de Usuário:**

`/^[a-zA-ZÀ-ÿ\s]+$/`

- Apenas letras (incluindo acentos) e espaços
- Não permite números ou símbolos

### **Nome de Empresa:**

`/^[a-zA-ZÀ-ÿ0-9\s\-\.]+$/`

- Letras, números, espaços, hífens e pontos
- Para nomes como "Empresa XYZ 123 Ltda."

### **Contato (Reclamação):**

- **Email:** Mesmo regex de email
- **WhatsApp:** `\d{10,15}` (10-15 dígitos)

---

## 🛠️ **Dicas para Desenvolvimento**

### **1. Executar durante desenvolvimento:**

```bash
npm run test:watch
```

### **2. Verificar validações específicas:**

```bash
npm run test:validators
```

### **3. Testar autenticação após mudanças:**

```bash
npm run test:auth
```

### **4. Debug de testes:**

```javascript
console.log('Response:', response.body); // Adicione logs
assert(condition, 'Mensagem descritiva clara');
```

---

## 📈 **Benefícios dos Testes**

✅ **Validação automática** - Verifica se validators estão funcionando  
✅ **Detecção de regressões** - Evita quebrar funcionalidades  
✅ **Documentação viva** - Mostra como a API deve ser usada  
✅ **Confiança para refatorar** - Mudanças com segurança  
✅ **Feedback rápido** - Erros detectados imediatamente

---

## 🔧 **Configuração Atual**

### **Dependencies instaladas:**

- `poku` - Executor de testes
- `supertest` - Testes HTTP/API

### **Scripts disponíveis:**

- `npm test` - Todos os testes
- `npm run test:auth` - Autenticação
- `npm run test:validators` - Validações
- `npm run test:reclamacao` - Reclamações
- `npm run test:watch` - Modo watch

---

## 🚨 **Importante para Execução**

1. **MongoDB** deve estar rodando
2. **Servidor** deve estar configurado corretamente
3. **Variáveis de ambiente** devem estar definidas
4. **Banco de teste** - considere usar um banco separado

### **Exemplo para banco de teste:**

```javascript
// No início dos testes
process.env.NODE_ENV = 'test';
process.env.MONGODB_URI = 'mongodb://localhost:27017/app_teste';
```

---

**🎉 Pronto! Agora você tem um sistema completo de testes com Poku e Supertest!**
