//INDEX.JS TELA DE LOGIN
import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import estilos from './estilos/estilosLogin';
import LottieView from 'lottie-react-native';

import { useRouter } from 'expo-router';
// Importa o hook de navegação do Expo Router

import CustomButton from './components/CustomButton';
import AuthModal from './components/AuthModal';
import Formulario from './components/Formulario';

// Adicione o import dos serviços de autenticação
import {
  loginUsuario,
  loginEmpresa,
  cadastrarUsuario,
  salvarToken,
} from './api/auth';
import api from './api/axios';
import { useAuth } from './hooks/useAuth';

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
    console.log('Tentando login com:', { email, senha });
    try {
      let data;
      if (modalTipo === 'cliente') {
        data = await loginUsuario({ email, senha });
      } else {
        data = await loginEmpresa({ email, senha });
      }
      // Salva o token retornado no AsyncStorage usando função utilitária
      await salvarToken(data.token);
      Alert.alert('Sucesso', 'Login realizado!');
      fecharModal();
      // Redireciona para a tela correta após login
      if (modalTipo === 'cliente') {
        router.push('/home'); // Cliente vai para home
      } else {
        router.push('/dashboard'); // Empresa vai para dashboard
      }
    } catch (error) {
      console.log('Erro no login:', error, error?.response);
      Alert.alert(
        'Erro',
        error.response?.data?.mensagem || 'Erro ao fazer login'
      );
    }
  };

  // Handler para cadastro
  const handleCadastro = async () => {
    try {
      await cadastrarUsuario({
        nome,
        email: emailCadastro,
        senha: senhaCadastro,
        confirmarSenha,
      });
      Alert.alert('Sucesso', 'Cadastro realizado!');
      fecharModal();
    } catch (error) {
      Alert.alert(
        'Erro',
        error.response?.data?.mensagem || 'Erro ao cadastrar'
      );
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
        />
      );
    }
    return null;
  };

  // CONTEUDOS -------
  // ------------------------------------------------------------------------------------------------

  return (
    <View style={estilos.container}>
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
      />

      {/* Botão de Login como Empresa */}
      <CustomButton
        title='Login como empresa'
        onPress={() => setModalTipo('empresa')}
      />

      {/* Botão de Cadastro */}
      <CustomButton
        title='Cadastre-se'
        onPress={() => setModalTipo('cadastro')}
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
