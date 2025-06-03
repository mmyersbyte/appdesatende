//INDEX.JS TELA DE LOGIN
import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  TextInput,
  ScrollView,
} from 'react-native';
import estilos from './estilos/estilosLogin';
import LottieView from 'lottie-react-native';
import { FontAwesome } from '@expo/vector-icons';
import { cadastrar, login as loginApi } from './services/api'; // Importa funções de conexão com backend

import { useRouter } from 'expo-router';
// Importa o hook de navegação do Expo Router

import CustomButton from './components/CustomButton';
import AuthModal from './components/AuthModal';
import Formulario from './components/Formulario';

const BASE_URL = 'http://10.0.2.2:5000/api';

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

  // Função para autenticar login com o backend
  const autenticarLogin = async () => {
    try {
      const resposta = await loginApi({ email, senha, tipo: modalTipo });
      if (resposta.data.user) {
        router.push('/home');
      } else if (resposta.data.empresa) {
        router.push('/dashboard');
      } else {
        alert('Tipo de usuário não reconhecido.');
      }
      fecharModal();
    } catch (erro) {
      alert(
        erro.response?.data?.message ||
          'Erro ao fazer login. Verifique os dados.'
      );
    }
  };

  // Função para cadastrar novo usuário ou empresa
  const cadastrarNovo = async () => {
    if (!nome || !emailCadastro || !senhaCadastro || !confirmarSenha) {
      alert('Preencha todos os campos!');
      return;
    }
    if (senhaCadastro !== confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }
    try {
      await cadastrar({
        nome,
        email: emailCadastro,
        senha: senhaCadastro,
        tipo: tipoCadastro,
      });
      alert('Cadastro realizado com sucesso! Faça login.');
      fecharModal();
    } catch (erro) {
      alert(
        erro.response?.data?.message || 'Erro ao cadastrar. Verifique os dados.'
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
            { title: 'Entrar', onPress: autenticarLogin },
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
            { title: 'Cadastrar', onPress: cadastrarNovo },
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
