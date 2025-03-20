import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import estilos from './estilos/estilosLogin';
import LottieView from 'lottie-react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // <--- ADICIONADO

export default function Index() {
  // <--- RENOMEADO de App() para Index()
  // Estado para controlar qual modal (formulário) está aberto: 'cliente', 'empresa', 'cadastro' ou null (fechado)
  const [modalTipo, setModalTipo] = useState(null);
  // Estados para os formulários de login (cliente/empresa)
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  // Estados para o formulário de cadastro
  const [nome, setNome] = useState('');
  const [emailCadastro, setEmailCadastro] = useState('');
  const [senhaCadastro, setSenhaCadastro] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  // Para navegar entre rotas do Expo Router
  const router = useRouter();

  // Função para fechar o modal e limpar os campos
  const fecharModal = () => {
    setModalTipo(null);
    // Limpar campos dos formulários (opcional)
    setEmail('');
    setSenha('');
    setNome('');
    setEmailCadastro('');
    setSenhaCadastro('');
    setConfirmarSenha('');
  };

  // Renderiza o conteúdo do modal com base no tipo selecionado
  const renderizarFormulario = () => {
    // Formulário para login (cliente ou empresa)
    if (modalTipo === 'cliente' || modalTipo === 'empresa') {
      return (
        <View style={estilos.formularioContainer}>
          <Text style={estilos.tituloFormulario}>
            {modalTipo === 'cliente'
              ? 'Login como Cliente'
              : 'Login como Empresa'}
          </Text>
          <TextInput
            style={estilos.input}
            placeholder='Email'
            placeholderTextColor='#999'
            value={email}
            onChangeText={setEmail}
            keyboardType='email-address'
            autoCapitalize='none'
          />
          <TextInput
            style={estilos.input}
            placeholder='Senha'
            placeholderTextColor='#999'
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />
          <TouchableOpacity
            style={estilos.botaoFormulario}
            onPress={() => {
              // Aqui você poderá integrar sua lógica de autenticação com o Express.js
              console.log('Submit login', modalTipo, email, senha);
              // Navegar para /home depois de logar
              router.push('/home');
            }}
          >
            <Text style={estilos.textoBotaoFormulario}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={fecharModal}
            style={estilos.botaoFechar}
          >
            <Text style={estilos.textoBotaoFechar}>Fechar</Text>
          </TouchableOpacity>
        </View>
      );
    }
    // Formulário de cadastroq
    else if (modalTipo === 'cadastro') {
      return (
        <ScrollView contentContainerStyle={estilos.formularioContainer}>
          <Text style={estilos.tituloFormulario}>Cadastro</Text>
          <TextInput
            style={estilos.input}
            placeholder='Nome'
            placeholderTextColor='#999'
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            style={estilos.input}
            placeholder='Email'
            placeholderTextColor='#999'
            value={emailCadastro}
            onChangeText={setEmailCadastro}
            keyboardType='email-address'
            autoCapitalize='none'
          />
          <TextInput
            style={estilos.input}
            placeholder='Senha'
            placeholderTextColor='#999'
            value={senhaCadastro}
            onChangeText={setSenhaCadastro}
            secureTextEntry
          />
          <TextInput
            style={estilos.input}
            placeholder='Confirmar Senha'
            placeholderTextColor='#999'
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            secureTextEntry
          />
          <TouchableOpacity
            style={estilos.botaoFormulario}
            onPress={() => {
              // Aqui você poderá integrar sua lógica de cadastro com o Express.js
              console.log(
                'Submit cadastro',
                nome,
                emailCadastro,
                senhaCadastro,
                confirmarSenha
              );
            }}
          >
            <Text style={estilos.textoBotaoFormulario}>Cadastrar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={fecharModal}
            style={estilos.botaoFechar}
          >
            <Text style={estilos.textoBotaoFechar}>Fechar</Text>
          </TouchableOpacity>
        </ScrollView>
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
        source={require('./estilos/vector-principal.json')}
        autoPlay
        loop
        style={estilos.animacao}
      />

      {/* Subtítulo 2 posicionado abaixo da animação e acima dos botões */}
      <Text style={estilos.subtitulo2}>
        Comece agora! Escolha como deseja entrar.{' '}
        <Text style={estilos.esqueci}>Esqueceu sua senha? Clique aqui</Text>
      </Text>

      {/* Botão de Login como Cliente */}
      <Pressable
        onPress={() => setModalTipo('cliente')}
        style={({ pressed }) => [
          estilos.botao,
          pressed && estilos.botaoPressionado,
        ]}
      >
        <View style={estilos.linhaBotao}>
          <View style={estilos.iconeEsquerdo}>
            <FontAwesome
              name='user'
              size={24}
              color='white'
            />
          </View>
          <View style={estilos.textoCentral}>
            <Text style={estilos.textoBotao}>Login como cliente</Text>
          </View>
          <View style={estilos.iconeDireito} />
        </View>
      </Pressable>

      {/* Botão de Login como Empresa */}
      <Pressable
        onPress={() => setModalTipo('empresa')}
        style={({ pressed }) => [
          estilos.botao,
          pressed && estilos.botaoPressionado,
        ]}
      >
        <View style={estilos.linhaBotao}>
          <View style={estilos.iconeEsquerdo}>
            <FontAwesome
              name='building'
              size={24}
              color='white'
            />
          </View>
          <View style={estilos.textoCentral}>
            <Text style={estilos.textoBotao}>Login como empresa</Text>
          </View>
          <View style={estilos.iconeDireito} />
        </View>
      </Pressable>

      {/* Botão de Cadastro */}
      <Pressable
        onPress={() => setModalTipo('cadastro')}
        style={({ pressed }) => [
          estilos.botao,
          pressed && estilos.botaoPressionado,
        ]}
      >
        <View style={estilos.linhaBotao}>
          <View style={estilos.iconeEsquerdo}>
            <FontAwesome
              name='user-plus'
              size={24}
              color='white'
            />
          </View>
          <View style={estilos.textoCentral}>
            <Text style={estilos.textoBotao}>Cadastre-se</Text>
          </View>
          <View style={estilos.iconeDireito} />
        </View>
      </Pressable>

      {/* Modal para exibir os formulários */}
      <Modal
        visible={modalTipo !== null}
        animationType='slide'
        transparent
        onRequestClose={fecharModal}
      >
        {/* Fundo semi-transparente para o modal */}
        <View style={estilos.modalFundo}>
          {/* Conteúdo do modal */}
          <View style={estilos.modalConteudo}>{renderizarFormulario()}</View>
        </View>
      </Modal>
    </View>
  );
}
