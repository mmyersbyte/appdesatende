//PERFIL CLIENTEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
import { useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ScrollView,
  FlatList,
  Modal,
  TextInput,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import estilos from './estilos/estilosPerfil';

import { FontAwesome } from '@expo/vector-icons';
// Importa o hook de navegação do Expo Router para navegar entre telas
import { useRouter } from 'expo-router';
// npx expo install expo-image-picker OU DESISTE!!
import * as ImagePicker from 'expo-image-picker';

export default function PerfilScreen() {
  // Estado para armazenar o nome do usuário (futuro CRUD)
  const [userName, setUserName] = useState('Usuário');
  // Estado para armazenar a URL ou caminho da foto de perfil (futuro CRUD)
  const [profileImage, setProfileImage] = useState(null);

  // Dados de exemplo para reclamações
  const [reclamacoes, setReclamacoes] = useState([
    {
      id: 1,
      titulo: 'Tinha uma mosca no meu lanche',
      empresa: 'Burguer Kongo',
      data: '10/03/2039',
      respondida: true,
    },
    {
      id: 2,
      titulo: 'oie',
      empresa: 'McDonalds',
      data: '15/03/2089',
      respondida: false,
    },
    {
      id: 3,
      titulo: 'Mataram minha tia',
      empresa: 'Serviço XYZ',
      data: '20/03/20224',
      respondida: false,
    },
  ]);

  // Estados para o modal de nova reclamação
  const [modalVisivel, setModalVisivel] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [sucessoEnvio, setSucessoEnvio] = useState(false);

  // Estados para os campos do formulário
  const [titulo, setTitulo] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagemReclamacao, setImagemReclamacao] = useState(null);

  // Hook para navegação
  const router = useRouter();

  // Função para selecionar foto de perfil da galeria
  // const selecionarFotoPerfil = async () => {
  //   try {
  //     // Solicitar permissão para acessar a galeria
  //     const { status } =
  //       await ImagePicker.requestMediaLibraryPermissionsAsync();

  //     if (status !== 'granted') {
  //       Alert.alert(
  //         'Permissão necessária',
  //         'Precisamos de permissão para acessar suas fotos.'
  //       );
  //       return;
  //     }

  //     // Abrir seletor de imagens
  //     //DSTV
  //     // Aqui seria o código para fazer upload da imagem para o servidor
  //       // e atualizar o perfil do usuário no banco de dados
  //     const resultado = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       allowsEditing: true,
  //       aspect: [1, 1],
  //       quality: 0.8,
  //     });

  //     if (
  //       !resultado.canceled &&
  //       resultado.assets &&
  //       resultado.assets.length > 0
  //     ) {
  //       setProfileImage(resultado.assets[0].uri);

  //       console.log('Foto de perfil selecionada:', resultado.assets[0].uri);

  //       Alert.alert('Sucesso', 'Foto de perfil atualizada com sucesso!');
  //     }
  //   } catch (erro) {
  //     console.error('Erro ao selecionar foto de perfil:', erro);
  //     Alert.alert('Erro', 'Não foi possível selecionar a foto de perfil.');
  //   }
  // };
  //dstv
  // const selecionarImagem = async () => {
  //   try {
  //     // Solicitar permissão para acessar a galeria
  //     const { status } =
  //       await ImagePicker.requestMediaLibraryPermissionsAsync();

  //     if (status !== 'granted') {
  //       Alert.alert(
  //         'Permissão necessária',
  //         'Precisamos de permissão para acessar suas fotos.'
  //       );
  //       return;
  //     }

  //     // Abrir seletor de imagens
  //     const resultado = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       allowsEditing: true,
  //       aspect: [4, 3],
  //       quality: 0.8,
  //     });

  //     if (
  //       !resultado.canceled &&
  //       resultado.assets &&
  //       resultado.assets.length > 0
  //     ) {
  //       setImagemReclamacao(resultado.assets[0].uri);
  //     }
  //   } catch (erro) {
  //     console.error('Erro ao selecionar imagem:', erro);
  //     Alert.alert('Erro', 'Não foi possível selecionar a imagem.');
  //   }
  // };

  // Funço para limpar o formulário
  const limparFormulario = () => {
    setTitulo('');
    setEmpresa('');
    setDescricao('');
    setImagemReclamacao(null);
    setSucessoEnvio(false);
  };

  // Funcao para fechar o modal
  const fecharModal = () => {
    //chama a funcao limpar
    limparFormulario();
    setModalVisivel(false);
  };

  // Função para enviar a reclamação
  const enviarReclamacao = async () => {
    // Validação básica
    if (!titulo.trim() || !empresa.trim() || !descricao.trim()) {
      Alert.alert(
        'Campos obrigatórios',
        'Por favor, preencha todos os campos obrigatórios.'
      );
      return;
    }

    try {
      setEnviando(true);

      // Simulação de envio para o banco de dados
      // Aqui seria a integração com o banco de dados real
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Criar objeto com os dados da reclamação
      const novaReclamacao = {
        id: Date.now(), // ID temporário (sera substituído pelo ID do banco de dados)
        titulo,
        empresa,
        descricao,
        imagemUrl: imagemReclamacao, // URL da imagem (seria o caminho após upload para o servidor)
        data: new Date().toLocaleDateString('pt-BR'),
        respondida: false,
        status: 'pendente',
      };

      // Adicionar a lista local(temporário até integração com banco de dados)
      setReclamacoes((reclamacoesAtuais) => [
        novaReclamacao,
        ...reclamacoesAtuais,
      ]);

      // Mostrar mensagem de sucesso
      setSucessoEnvio(true);

      // Fechar o modal após alguns segundos
      setTimeout(() => {
        fecharModal();
      }, 2000);
    } catch (erro) {
      console.error('Erro ao enviar reclamação:', erro);
      Alert.alert(
        'Erro',
        'Não foi possível enviar sua reclamação. Tente novamente.'
      );
    } finally {
      setEnviando(false);
    }
  };

  // Função para renderizar cada item da lista de reclamações
  const renderReclamacao = ({ item }) => (
    <View style={estilos.itemReclamacao}>
      <View style={estilos.infoReclamacao}>
        <Text style={estilos.tituloReclamacao}>{item.titulo}</Text>
        <Text style={estilos.empresaReclamacao}>{item.empresa}</Text>
        <Text style={estilos.dataReclamacao}>Data: {item.data}</Text>
      </View>
      <View
        style={[
          estilos.statusReclamacao,
          item.respondida ? estilos.respondida : estilos.naoRespondida,
        ]}
      >
        <Text style={estilos.textoStatus}>
          {item.respondida ? 'Respondida' : 'Pendente'}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={estilos.container}>
      {/* Área de cabeçalho com capa e foto de perfil */}
      <View style={estilos.cabecalho}>
        {/* Imagem de capa padrão */}
        <View style={estilos.areaCapa}>
          <Image
            style={estilos.imagemCapa}
            source={require('./imgs/desatendeHome.jpg')}
          />
        </View>

        {/* Container para foto de perfil sobreposta à capa */}
        <Pressable
          style={estilos.containerFoto}
          // onPress={selecionarFotoPerfil}
        >
          <View style={estilos.bordaFoto}>
            {profileImage ? (
              // Se existir foto de perfil, exibe a imagem
              <Image
                source={{ uri: profileImage }}
                style={estilos.fotoPerfil}
              />
            ) : (
              // Se não tem foto, exibe um ícone de usuário com fundo
              <View style={estilos.placeholderFoto}>
                <FontAwesome
                  name='user'
                  size={50}
                  color='#D84040'
                />
              </View>
            )}
          </View>
          <View style={estilos.botaoEditarFoto}>
            <FontAwesome
              name='camera'
              size={16}
              color='white'
            />
          </View>
        </Pressable>
      </View>

      {/* Informações do usuário */}
      <View style={estilos.infoUsuario}>
        <Text style={estilos.boasVindas}>Olá, bem vindo</Text>
        <Text style={estilos.nomeUsuario}>{userName}</Text>
      </View>

      {/* Conteúdo principal com scroll */}
      <ScrollView style={estilos.conteudoPrincipal}>
        {/* Seção de reclamações */}
        <View style={estilos.secaoReclamacoes}>
          <Text style={estilos.tituloSecao}>Suas Reclamações</Text>

          {/* Lista de reclamações */}
          {reclamacoes.length > 0 ? (
            <FlatList
              data={reclamacoes}
              renderItem={renderReclamacao}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false} // Desativa o scroll da FlatList para usar o ScrollView principal
            />
          ) : (
            <Text style={estilos.semReclamacoes}>
              Você ainda não possui reclamações registradas.
            </Text>
          )}

          {/* Botão para adicionar nova reclamação */}
          <Pressable
            style={estilos.botaoNovaReclamacao}
            onPress={() => setModalVisivel(true)}
          >
            <FontAwesome
              name='plus'
              size={16}
              color='white'
              style={estilos.iconeBotao}
            />
            <Text style={estilos.textoBotao}>Nova Reclamação</Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Modal para criar nova reclamação */}
      <Modal
        visible={modalVisivel}
        animationType='slide'
        transparent={true}
        onRequestClose={fecharModal}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={estilos.centrarModal}
        >
          <View style={estilos.conteudoModal}>
            {/* Cabeçalho do modal */}
            <View style={estilos.cabecalhoModal}>
              <Text style={estilos.tituloModal}>Nova Reclamação</Text>
              <Pressable
                onPress={fecharModal}
                style={estilos.botaoFechar}
              >
                <FontAwesome
                  name='times'
                  size={20}
                  color='white'
                />
              </Pressable>
            </View>

            {/* Conteúdo do formulário */}
            {sucessoEnvio ? (
              // Mensagem de sucesso
              <View style={estilos.sucessoContainer}>
                <FontAwesome
                  name='check-circle'
                  size={60}
                  color='#27ae60'
                />
                <Text style={estilos.textoSucesso}>
                  Reclamação enviada com sucesso!
                </Text>
              </View>
            ) : (
              // Formulário
              <ScrollView style={estilos.formulario}>
                {/* Campo de título */}
                <View style={estilos.campoFormulario}>
                  <Text style={estilos.labelFormulario}>Título *</Text>
                  <TextInput
                    style={estilos.inputFormulario}
                    placeholder='Ex: Atendente gritou comigo'
                    placeholderTextColor='#666'
                    value={titulo}
                    onChangeText={setTitulo}
                  />
                </View>

                {/* Campo de empresa */}
                <View style={estilos.campoFormulario}>
                  <Text style={estilos.labelFormulario}>Empresa *</Text>
                  <TextInput
                    style={estilos.inputFormulario}
                    placeholder='Ex: Restaurante Desatende'
                    placeholderTextColor='#666'
                    value={empresa}
                    onChangeText={setEmpresa}
                  />
                </View>

                {/* Campo de descrição */}
                <View style={estilos.campoFormulario}>
                  <Text style={estilos.labelFormulario}>Descrição *</Text>
                  <TextInput
                    style={[estilos.inputFormulario, estilos.inputMultiline]}
                    placeholder='Descreva detalhadamente o problema...'
                    placeholderTextColor='#666'
                    multiline={true}
                    numberOfLines={4}
                    textAlignVertical='top'
                    value={descricao}
                    onChangeText={setDescricao}
                  />
                </View>

                {/* Campo de upload de imagem */}
                <View style={estilos.campoFormulario}>
                  <Text style={estilos.labelFormulario}>Imagem (opcional)</Text>

                  {/* Área de preview da imagem */}
                  {imagemReclamacao ? (
                    <View style={estilos.previewContainer}>
                      <Image
                        source={{ uri: imagemReclamacao }}
                        style={estilos.previewImagem}
                      />
                      <Pressable
                        style={estilos.botaoRemoverImagem}
                        onPress={() => setImagemReclamacao(null)}
                      >
                        <FontAwesome
                          name='trash'
                          size={16}
                          color='white'
                        />
                      </Pressable>
                    </View>
                  ) : (
                    <Pressable
                      style={estilos.botaoUploadImagem}
                      // onPress={selecionarImagem}
                    >
                      <FontAwesome
                        name='camera'
                        size={20}
                        color='#fff'
                      />
                      <Text style={estilos.textoUploadImagem}>
                        Selecionar imagem
                      </Text>
                    </Pressable>
                  )}
                </View>

                {/* Botão de enviar */}
                <Pressable
                  style={estilos.botaoEnviar}
                  onPress={enviarReclamacao}
                  disabled={enviando}
                >
                  {enviando ? (
                    <ActivityIndicator
                      color='white'
                      size='small'
                    />
                  ) : (
                    <>
                      <FontAwesome
                        name='paper-plane'
                        size={16}
                        color='white'
                        style={estilos.iconeBotao}
                      />
                      <Text style={estilos.textoBotao}>Enviar Reclamação</Text>
                    </>
                  )}
                </Pressable>
              </ScrollView>
            )}
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Footer com navegação */}
      <View style={estilos.rodape}>
        {/* Ícone Home */}
        <Pressable
          style={estilos.itemRodape}
          onPress={() => router.push('/home')}
          //home
        >
          <View style={estilos.itemNaoSelecionado}>
            <FontAwesome
              name='home'
              size={24}
              color='#555'
            />
            <Text style={[estilos.textoRodape, { color: '#555' }]}>Home</Text>
          </View>
        </Pressable>

        {/* Ícone Perfil - ativo */}
        <Pressable style={estilos.itemRodape}>
          <View style={estilos.itemSelecionado}>
            <FontAwesome
              name='user'
              size={24}
              color='#D84040'
            />
            <Text style={[estilos.textoRodape, { color: 'white' }]}>
              Seu Perfil
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
