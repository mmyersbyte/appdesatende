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
import LottieView from 'lottie-react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function App() {
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
        source={require('./Animation - 1742315007264.json')}
        autoPlay
        loop
        style={estilos.animacao}
      />

      {/* Subtítulo 2 posicionado abaixo da animação e acima dos botões */}
      <Text style={estilos.subtitulo2}>
        Comece agora! Escolha como deseja entrar.
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

const estilos = StyleSheet.create({
  // Container principal da tela
  container: {
    flex: 1,
    backgroundColor: '#1A1A1D',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  // Estilo do título
  titulo: {
    fontSize: 27,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: 'white',
  },
  // Estilo para a palavra diferenciada no título
  tituloDiferente: {
    color: '#6A1E55',
  },
  // Estilo do subtítulo
  subtitulo: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
    marginHorizontal: 10,
    marginBottom: 20,
  },
  // Estilo para a parte diferenciada do subtítulo
  subdiferente: {
    color: '#A64D79',
    fontSize: 18,
  },
  // Estilo da animação
  animacao: {
    width: '100%',
    height: 180,
    marginBottom: 50,
  },
  // Estilo do subtítulo2
  subtitulo2: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    marginHorizontal: 20,
    marginBottom: 120,
  },
  // Estilo base dos botões
  botao: {
    backgroundColor: '#6A1E55',
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 6,
    width: '86%',
  },
  // Opacidade ao pressionar o botão
  botaoPressionado: {
    opacity: 0.2,
  },
  // Linha interna do botão para alinhar ícone e texto
  linhaBotao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  // Container do ícone à esquerda
  iconeEsquerdo: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Container para centralizar o texto
  textoCentral: {
    flex: 1,
    alignItems: 'center',
  },
  // Placeholder para equilibrar o layout
  iconeDireito: {
    width: 50,
  },
  // Estilo do texto dos botões
  textoBotao: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
  // Estilos do modal
  modalFundo: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente para destacar o modal
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  modalConteudo: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 20,
  },
  // Estilos para o container do formulário dentro do modal
  formularioContainer: {
    alignItems: 'center',
  },
  // Estilo do título do formulário
  tituloFormulario: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6A1E55',
  },
  // Estilo dos inputs (campos de texto)
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    color: '#333',
  },
  // Estilo do botão do formulário
  botaoFormulario: {
    backgroundColor: '#6A1E55',
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  // Estilo do texto do botão do formulário
  textoBotaoFormulario: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
  // Botão para fechar o modal (formulário)
  botaoFechar: {
    marginTop: 10,
  },
  textoBotaoFechar: {
    color: '#6A1E55',
    fontSize: 16,
  },
});
