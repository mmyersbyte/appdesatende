<!-- Aqui é o titulo! -->

<p align="center">
  <img src="https://img.shields.io/badge/DESATENDE-FF1A1A?style=for-the-badge&logo=fire&logoColor=white" alt="DESATENDE" width="200"/>
</p>

<hr />

<!-- stacks -->
<p align="center">
  <img src="https://img.shields.io/badge/JAVASCRIPT-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white" alt="JAVASCRIPT">
  <img src="https://img.shields.io/badge/NODE-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="NODE">
  <img src="https://img.shields.io/badge/EXPRESS.JS-FF6F61?style=for-the-badge&logo=express&logoColor=white" alt="EXPRESS.JS">
  <img src="https://img.shields.io/badge/MONGODB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MONGODB">
  <img src="https://img.shields.io/badge/SWAGGER-DOCS-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" alt="SWAGGER">
  <img src="https://img.shields.io/badge/React_Native-20232a?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native">

</p>

<!-- imagem -->
<img src="assets/LABEMGITHUB.png" alt="Banner da LABEMGITHUB" />

<h2>Objetivo do Projeto</h2> 
<p> Desatende é um app que desenvolvi sozinho para um projeto da faculdade, com backend focado em boas práticas e segurança. O nome “Desatende” une as palavras “desatenção” e “atende”, deixando claro o propósito: registrar falhas no atendimento em setores como restaurantes, faculdades, companhias aéreas e outros. Usuários podem cadastrar reclamações, detalhando o ocorrido e a localização, e as reclamações são organizadas por categoria, facilitando a busca por setor. Empresas e instituições podem responder publicamente, promovendo transparência e resolução. O objetivo é criar uma comunidade onde experiências reais ajudam a pressionar por melhorias no atendimento e elevar o padrão de serviço.
O aplicativo não foi publicado em ambiente de produção como o Console e Render, sendo destinado exclusivamente a fins educacionais.
</p>

<hr/>

<h2>Autenticação e Segurança</h2>
<p> A autenticação utiliza <code>JWT</code> para gerar e validar tokens de sessão de forma segura. Os tokens são assinados com uma chave secreta definida em variáveis de ambiente (<code>dotenv</code>), nunca expostos no código-fonte. As senhas dos usuários são validadas, possuem requisitos mínimos e são armazenadas já criptografadas usando <code>bcrypt</code>. O backend implementa validação de dados com <code>Joi</code> e limita tentativas abusivas de acesso através do <code>express-rate-limit</code>, protegendo a API contra ataques de força bruta e DDoS. Como o frontend é React Native, não há necessidade de configuração de <code>CORS</code>. O sistema possui fluxo completo de cadastro e autenticação, permitindo que novos usuários se registrem normalmente. </p>
</p>

<h2>Telas e funcionalidades</h2> <p> O aplicativo possui fluxo de autenticação com telas de login e cadastro, tanto para usuários quanto empresas. Após login, a <strong>Home</strong> lista empresas disponíveis, permitindo abrir um modal para envio de reclamações utilizando o método <code>POST</code> na API. Usuários autenticados podem acessar o <strong>Perfil</strong> para visualizar suas reclamações, deletar abertas e avaliar respostas recebidas após interação da empresa. A tela de perfil também conta com botão de logout seguro. <br><br> No dashboard da empresa, é possível visualizar todas as reclamações recebidas. Cada reclamação pode ser respondida diretamente pelo dashboard, utilizando o método <code>PATCH</code> para editar o status e a resposta do registro. Todo o fluxo é baseado em autenticação via <code>JWT</code> e integração direta com as rotas protegidas do backend. </p>

<h2>Stacks e principais tecnologias</h2> <p> O projeto utiliza <strong>React Native</strong> para a interface mobile, integração de APIs via <strong>Axios</strong>, backend construído em <strong>Node.js</strong> com <strong>Express</strong> e <strong>ESModules</strong>. O banco de dados é <strong>MongoDB</strong>, utilizando <strong>Mongoose</strong> como ODM. <br><br> A autenticação é baseada em <strong>JWT</strong> e as senhas são protegidas com <strong>bcrypt</strong>. O projeto adota <strong>Joi</strong> para validação de dados, <strong>express-rate-limit</strong> para limitar requisições e diversas outras bibliotecas para garantir boas práticas e segurança. </p>

<h2>Testes Automatizados</h2>
<p> Os testes unitários foram implementados com o <code>Poku</code> leve, rápido e brasileiro! 🇧🇷
Além disso, utilizei <code>Thunder Client</code> e <code>HTTPie</code> para testes manuais dos endpoints.
</p>

<h2>Swagger</h2>
<p>
Com o backend rodando, acesse <code>http://localhost:5000/api-docs</code> no navegador para testar a API pela interface gráfica Swagger UI.
</p>

<h2>Como rodar o backend localmente </h2>
<p>
Clone este repositório e acesse a pasta <code>backend</code>. Crie um arquivo <code>.env</code> com base no <code>.env.example</code> fornecido.
</p>
<p>
Instale as dependências com <code>npm install</code> e inicie o servidor usando <code>npm run dev</code> ou <code>node server.js</code>.
</p>

<p> Se desejar testar autenticação JWT, defina um valor seguro para <code>JWT_SECRET</code> </p>

<h2>Como rodar o frontend localmente </h2>
<p>Installe o EXPO no telefone fisíco e altere a BASE_URL em app.json ou instale o Android Studio e rode npx install expo e npm install no fr</p>

<h2>Estrutura do Projeto</h2>
<pre><code>.
├── <b>backend</b>
│   ├── .env
│   ├── package.json
│   ├── server.js
│   ├── swagger
│   │   ├── swagger.json
│   │   └── swagger.js
│   ├── tests
│   │   ├── auth.test.js
│   │   ├── validators.test.js
│   └── src
│       ├── app.js
│       ├── config
│       │   └── db.js
│       ├── controllers
│       │   ├── authEmpresa.Controller.js
│       │   ├── authUser.Controller.js
│       │   ├── empresa.Controller.js
│       │   ├── reclamacao.Controller.js
│       │   └── user.Controller.js
│       ├── middlewares
│       │   ├── auth.js
│       │   ├── errorHandler.js
│       │   ├── notFoundHandler.js
│       │   ├── rateLimiter.js
│       │   ├── upload.js
│       │   └── validate.js
│       ├── models
│       │   ├── Empresa.js
│       │   ├── Reclamacao.js
│       │   └── User.js
│       ├── routes
│       │   ├── empresa.js
│       │   ├── reclamacao.js
│       │   └── user.js
│       └── validators
│           ├── authValidators.js
│           └── reclamacaoValidators.js
├── <b>app</b>
│   ├── api
│   │   ├── auth.js
│   │   ├── axios.js
│   │   ├── empresas.js
│   │   └── reclamacao.js
│   ├── components
│   │   ├── AuthModal.jsx
│   │   ├── CustomButton.jsx
│   │   ├── EmpresaItem.jsx
│   │   ├── Formulario.jsx
│   │   ├── HeaderTitulo.jsx
│   │   ├── LogoutButton.jsx
│   │   ├── ModalAvaliarReclamacao.jsx
│   │   ├── ModalCriarReclamacao.jsx
│   │   ├── ModalRespostaReclamacao.jsx
│   │   ├── ReclamacaoItem.jsx
│   │   └── Rodape.jsx
│   ├── estilos
│   │   ├── estilosHome.js
│   │   ├── estilosLogin.js
│   │   ├── estilosPerfil.js
│   │   └── estilosPerfilEmpresa.js
│   ├── hooks
│   │   ├── useAuth.js
│   │   ├── useEmpresas.js
│   │   ├── useFeedback.js
│   │   ├── useImagePicker.js
│   │   ├── useMinhasReclamacoes.js
│   │   ├── useReclamacoesRecebidas.js
│   │   └── useRefresh.js
│   ├── dashboard.jsx
│   ├── home.jsx
│   ├── index.jsx
│   └── perfil.jsx
├── app.js
├── app.json
├── package.json
</code></pre>
