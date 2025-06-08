# App DesAtende - Sistema de Reclamações para Empresas

## 📖 Sobre o Projeto

O **DesAtende** é um aplicativo desenvolvido em React Native com Expo que permite aos usuários registrar e gerenciar reclamações sobre empresas. O sistema inclui autenticação de usuários, sistema de avaliações e administração de reclamações.

## 🏗️ Estrutura do Projeto

### Frontend (React Native + Expo)

```
app/
├── components/        # Componentes reutilizáveis
├── hooks/            # Custom hooks
├── api/              # Configurações de API
├── imgs/             # Imagens e ícones
├── estilos/          # Arquivos de estilo
├── (auth)/           # Rotas de autenticação
└── (tabs)/           # Navegação por abas
```

### Backend (Node.js + Express + MongoDB)

```
backend/
├── src/
│   ├── config/       # Configurações (MongoDB)
│   ├── controllers/  # Controladores das rotas
│   ├── middlewares/  # Middlewares personalizados
│   ├── models/       # Modelos do MongoDB
│   └── routes/       # Definição de rotas
├── tests/            # Testes automatizados
├── server.js         # Servidor principal
└── app.js            # Configuração do Express
```

## 🚀 Como Executar o Projeto (Para Recrutadores)

### Pré-requisitos

1. **Node.js** (versão 16+)
2. **npm** ou **yarn**
3. **MongoDB** (local ou Atlas)
4. **Expo CLI** ou **Expo Go** no celular

### Opção 1: Execução Rápida com Expo Go

#### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd appdesatende
```

#### 2. Configure o Backend

```bash
cd backend
npm install

# Configure o arquivo .env
cp .env.example .env
# Edite o .env com sua string do MongoDB
```

Edite o arquivo `backend/.env`:

```env
MONGODB_URI=sua_string_mongodb_aqui
PORT=5000
```

#### 3. Inicie o Backend

```bash
npm run dev
```

#### 4. Configure o Frontend

```bash
cd ..  # Volte para a raiz do projeto
npm install
```

#### 5. Configure a URL da API

No arquivo `app.json`, encontre o campo `extra.API_BASE_URL` e atualize com o IP da sua máquina:

```json
{
  "extra": {
    "API_BASE_URL": "http://SEU_IP_LOCAL:5000/api"
  }
}
```

**Para descobrir seu IP:**

- **Windows**: `ipconfig`
- **macOS/Linux**: `ifconfig` ou `ip addr show`

#### 6. Execute o App

```bash
npx expo start
```

#### 7. Teste no Dispositivo

1. Baixe o **Expo Go** na Play Store/App Store
2. Escaneie o QR Code que aparece no terminal
3. O app abrirá no seu celular

### Opção 2: Build para Dispositivo Físico

#### Para Android:

```bash
npx expo build:android
```

#### Para iOS:

```bash
npx expo build:ios
```

## 🔧 Configurações de Ambiente

### Variáveis de Ambiente Expo

O projeto usa variáveis de ambiente nativas do Expo configuradas em `app.json`:

```json
{
  "extra": {
    "API_BASE_URL": "http://192.168.1.17:5000/api"
  }
}
```

### Variáveis do Backend

Configure no arquivo `backend/.env`:

```env
MONGODB_URI=sua_string_mongodb_completa
PORT=5000
```

## 📱 Funcionalidades Principais

### Autenticação

- ✅ Registro de usuários
- ✅ Login/Logout
- ✅ Persistência de sessão

### Gestão de Reclamações

- ✅ Criar reclamações
- ✅ Visualizar reclamações próprias
- ✅ Visualizar reclamações recebidas (empresas)
- ✅ Sistema de avaliações (1-5 estrelas)
- ✅ Deletar reclamações (apenas se abertas)

### Interface

- ✅ Navegação por abas
- ✅ Design responsivo
- ✅ Modais para criação e avaliação
- ✅ Sistema de cores consistente

## 🛠️ Tecnologias Utilizadas

### Frontend

- **React Native** com **Expo**
- **Expo Router** para navegação
- **Axios** para requisições HTTP
- **Expo Image Picker** para upload de imagens

### Backend

- **Node.js** com **Express**
- **MongoDB** com **Mongoose**
- **JWT** para autenticação
- **Bcrypt** para hash de senhas
- **Multer** para upload de arquivos

## 🧪 Executando Testes

### Backend

```bash
cd backend
npm test
```

### Frontend

```bash
npm test
```

## 📋 Checklist de Verificação

Antes de testar, verifique se:

- [ ] MongoDB está rodando e acessível
- [ ] Backend iniciou sem erros na porta 5000
- [ ] Arquivo `.env` está configurado corretamente
- [ ] IP no `app.json` está correto para sua rede
- [ ] Dispositivo móvel está na mesma rede Wi-Fi
- [ ] Expo Go está instalado no dispositivo

## 🐛 Resolução de Problemas Comuns

### "Network Error" no app

- Verifique se o backend está rodando
- Confirme se o IP no `app.json` está correto
- Teste a conexão: `http://SEU_IP:5000/api` no navegador

### "MongoDB connection failed"

- Verifique a string de conexão no `.env`
- Confirme se o MongoDB está rodando
- Para MongoDB Atlas, verifique as permissões de IP

### "Expo Go não carrega"

- Certifique-se de estar na mesma rede Wi-Fi
- Tente limpar o cache: `npx expo start --clear`
- Reinicie o Expo Go

## 📞 Suporte

Em caso de dúvidas durante a execução:

1. Verifique os logs do terminal
2. Confirme as configurações de rede
3. Teste as rotas da API diretamente

## 🎯 Demonstração Rápida

Para uma demonstração rápida:

1. Execute apenas `npx expo start`
2. Use o modo web: pressione `w` no terminal
3. Teste as funcionalidades básicas no navegador

---

**Tempo estimado para setup completo: 10-15 minutos**
