import React, { useState } from 'react';
import { View, Text } from 'react-native';
import estilos from './estilos/estilosLogin';
import LottieView from 'lottie-react-native';
import { useRouter } from 'expo-router';
import CustomButton from './components/CustomButton';
import AuthModal from './components/AuthModal';
import Formulario from './components/Formulario';
import { FontAwesome } from '@expo/vector-icons';

// Adicione o import dos serviços de autenticação
import {
  loginUsuario,
  loginEmpresa,
  cadastrarUsuario,
  cadastrarEmpresa,
  salvarToken,
} from './api/auth';
import api from './api/axios';
import { useAuth } from './hooks/useAuth';
import { useFeedback } from './hooks/useFeedback';

// Adiciona um interceptor para logar todas as requisições feitas pelo Axios
api.interceptors.request.use((request) => {
  console.log('Requisição Axios:', request);
  return request;
});

export default function Index() {
  // Estado para controlar qual modal (formulário) tá aberto: 'cliente', 'empresa', 'cadastro' ou null //(fechado)
  const [modalTipo, setModalTipo] = useState(null);
  // Estaos para os formulários de login (cliente/empresa)
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  // Estados para o formulário de cadastro
  const [nome, setNome] = useState('');
  const [emailCadastro, setEmailCadastro] = useState('');
  const [senhaCadastro, setSenhaCadastro] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  // Estado para controlar o tipo de cadastro: 'cliente' ou 'empresa'
  const [tipoCadastro, setTipoCadastro] = useState('cliente');

  // Para navegar entre rotas do Expo
  const router = useRouter();
  const { token, tipo, carregando: carregandoAuth } = useAuth();
  const feedback = useFeedback();

  // Função para fechar o modal e limpar os campos
  const fecharModal = () => {
    setModalTipo(null);
    setEmail('');
    setSenha('');
    setNome('');
    setEmailCadastro('');
    setSenhaCadastro('');
    setConfirmarSenha('');
  };

  // Handler para login
  const handleLogin = async () => {
    if (!email.trim() || !senha.trim()) {
      feedback.showError('Preencha todos os campos!');
      return;
    }
    try {
      let data;
      if (modalTipo === 'cliente') {
        data = await loginUsuario({ email, senha });
      } else {
        data = await loginEmpresa({ email, senha });
      }
      await salvarToken(data.token);
      feedback.showSuccess('Login realizado!');
      fecharModal();
      if (modalTipo === 'cliente') {
        router.push('/home');
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      const msg =
        error.response?.data?.mensagem || error.response?.data?.message;
      if (msg === 'Email ou senha inválidos.') {
        feedback.showError('Senha inválida ou usuário não encontrado!');
      } else {
        feedback.showError(msg || 'Erro ao fazer login');
      }
    }
  };

  // Handler para cadastro
  const handleCadastro = async () => {
    if (
      !nome.trim() ||
      !emailCadastro.trim() ||
      !senhaCadastro.trim() ||
      !confirmarSenha.trim()
    ) {
      feedback.showError('Preencha todos os campos!');
      return;
    }
    if (senhaCadastro !== confirmarSenha) {
      feedback.showError('As senhas não coincidem!');
      return;
    }
    try {
      if (tipoCadastro === 'empresa') {
        await cadastrarEmpresa({
          nome,
          email: emailCadastro,
          senha: senhaCadastro,
          tipo: 'empresa',
        });
      } else {
        await cadastrarUsuario({
          nome,
          email: emailCadastro,
          senha: senhaCadastro,
          confirmarSenha,
          tipo: 'user',
        });
      }
      feedback.showSuccess('Cadastro realizado!');
      fecharModal();
    } catch (error) {
      const msg =
        error.response?.data?.mensagem || error.response?.data?.message;
      if (msg === 'Já existe um usuário com este email.') {
        feedback.showError('Este email já está cadastrado!');
      } else {
        feedback.showError(msg || 'Erro ao cadastrar');
      }
    }
  };

  // Renderiza o conteúdo do modal com base no tipo selecionado
  const renderizarFormulario = () => {
    // Formulário para login (cliente ou empresa)
    if (modalTipo === 'cliente' || modalTipo === 'empresa') {
      return (
        <Formulario
          titulo={modalTipo === 'cliente' ? 'Login' : 'Login Empresa'}
          campos={[
            {
              placeholder: 'Email',
              value: email,
              onChangeText: setEmail,
              props: { keyboardType: 'email-address', autoCapitalize: 'none' },
            },
            {
              placeholder: 'Senha',
              value: senha,
              onChangeText: setSenha,
              props: { secureTextEntry: true },
            },
          ]}
          botoes={[
            { title: 'Entrar', onPress: handleLogin },
            { title: 'Fechar', onPress: fecharModal },
          ]}
          corBotao='#D84040'
        />
      );
    }
    // Formulário de cadastro
    else if (modalTipo === 'cadastro') {
      return (
        <Formulario
          titulo='Cadastro'
          campos={[
            {
              placeholder: 'Nome',
              value: nome,
              onChangeText: setNome,
            },
            {
              placeholder: 'Email',
              value: emailCadastro,
              onChangeText: setEmailCadastro,
              props: { keyboardType: 'email-address', autoCapitalize: 'none' },
            },
            {
              placeholder: 'Senha',
              value: senhaCadastro,
              onChangeText: setSenhaCadastro,
              props: { secureTextEntry: true },
            },
            {
              placeholder: 'Confirmar Senha',
              value: confirmarSenha,
              onChangeText: setConfirmarSenha,
              props: { secureTextEntry: true },
            },
          ]}
          botoes={[
            { title: 'Cadastrar', onPress: handleCadastro },
            { title: 'Fechar', onPress: fecharModal },
          ]}
          corBotao='#D84040'
        >
          {/* Botões de seleção de tipo de cadastro */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 12,
              gap: 8,
            }}
          >
            <CustomButton
              title={
                <>
                  <FontAwesome
                    name='user'
                    size={20}
                    color='#fff'
                  />
                </>
              }
              onPress={() => setTipoCadastro('cliente')}
              disabled={tipoCadastro === 'cliente'}
              height={45}
              width={20}
              cor='#D84040'
            />
            <CustomButton
              title={
                <>
                  <FontAwesome
                    name='building'
                    size={20}
                    color='#fff'
                  />
                </>
              }
              onPress={() => setTipoCadastro('empresa')}
              disabled={tipoCadastro === 'empresa'}
              height={45}
              width={20}
              cor='#D84040'
            />
          </View>

          <Text style={{ textAlign: 'center', color: '#bbb', marginBottom: 8 }}>
            Tipo selecionado:{' '}
            <Text
              style={{ color: '#D84040', fontWeight: 'bold', fontSize: 16 }}
            >
              {tipoCadastro === 'empresa' ? 'Empresa' : 'Cliente'}
            </Text>
          </Text>
        </Formulario>
      );
    }
    return null;
  };

  // CONTEUDOS -------
  // ------------------------------------------------------------------------------------------------

  return (
    <View style={estilos.container}>
      {/* Feedback visual */}
      {feedback.error && (
        <Text
          style={{ color: '#D84040', textAlign: 'center', marginBottom: 8 }}
        >
          {feedback.error}
        </Text>
      )}
      {feedback.success && (
        <Text
          style={{ color: '#27ae60', textAlign: 'center', marginBottom: 8 }}
        >
          {feedback.success}
        </Text>
      )}
      {/* Exemplo de uso do hook useAuth */}
      <Text style={{ color: '#888', fontSize: 12, marginBottom: 8 }}>
        Token: {token ? token.slice(0, 16) + '...' : 'Nenhum'} | Tipo:{' '}
        {tipo || 'N/A'} | Carregando: {carregandoAuth ? 'Sim' : 'Não'}
      </Text>
      {/* Títuls*/}
      <Text style={estilos.titulo}>
        Seja bem-vindo ao <Text style={estilos.tituloDiferente}>Desatende</Text>
        !
      </Text>
      {/* Subtítulo com descrição */}
      <Text style={estilos.subtitulo}>
        Já sofreu com um{' '}
        <Text style={estilos.subdiferente}>atendimento ruim</Text>? Compartilhe
        sua experiência e ajude a melhorar os serviços oferecidos!
      </Text>

      {/* Animação -- Lottie */}
      <LottieView
        source={require('./imgs/vectorLogin.json')}
        autoPlay
        loop
        style={estilos.animacao}
      />

      {/* Subtítulo 2 posicionado abaixo da animação e acima dos botões */}
      <Text style={estilos.subtitulo2}>
        Comece agora! Escolha como deseja entrar. Esqueceu sua senha?{' '}
        <Text style={estilos.esqueci}>Clique aqui</Text>
      </Text>

      {/* Botão de Login como Cliente */}
      <CustomButton
        title='Login como cliente'
        onPress={() => setModalTipo('cliente')}
        cor='#D84040'
      />

      {/* Botão de Login como Empresa */}
      <CustomButton
        title='Login como empresa'
        onPress={() => setModalTipo('empresa')}
        cor='#D84040'
      />

      {/* Botão de Cadastro */}
      <CustomButton
        title='Cadastre-se'
        onPress={() => setModalTipo('cadastro')}
        cor='#D84040'
      />

      {/* Modal para exibir os formulários */}
      <AuthModal
        visible={modalTipo !== null}
        onRequestClose={fecharModal}
        renderizarFormulario={renderizarFormulario}
      />
    </View>
  );
}
