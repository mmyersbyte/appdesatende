// HOME CLIENTE!!
import { useState, useEffect } from 'react';
import estilos from './estilos/estilosHome';
import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  FlatList,
  ActivityIndicator,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
// Importa o hook de navegação do Expo Router
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import Rodape from './components/Rodape';
import EmpresaItem from './components/EmpresaItem';
import * as ImagePicker from 'expo-image-picker';
import { buscarEmpresas } from './api/empresas'; // Importa a função de busca

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [imagensCarregadas, setImagensCarregadas] = useState({});
  const router = useRouter();

  // Estado para empresas reais do backend
  const [empresas, setEmpresas] = useState([]);
  const [carregandoEmpresas, setCarregandoEmpresas] = useState(true);

  // Busca empresas reais ao abrir a tela
  useEffect(() => {
    async function carregarEmpresas() {
      try {
        const dados = await buscarEmpresas();
        setEmpresas(dados);
      } catch (e) {
        // Log detalhado do erro para depuração
        console.log(
          'Erro ao buscar empresas:',
          e?.response?.data || e.message || e
        );
        Alert.alert('Erro', 'Não foi possível carregar as empresas.');
      } finally {
        setCarregandoEmpresas(false);
      }
    }
    carregarEmpresas();
  }, []);

  // Filtra as 5 primeiras empresas como populares
  const empresasPopulares = empresas.slice(0, 5);

  // Estados para modal e empresa selecionada
  const [modalVisivel, setModalVisivel] = useState(false);
  const [empresaSelecionada, setEmpresaSelecionada] = useState(null);
  // Estados do formulário de reclamação
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [sucessoEnvio, setSucessoEnvio] = useState(false);
  const [imagemReclamacao, setImagemReclamacao] = useState(null);

  const handleImageLoad = (id) => {
    setImagensCarregadas((prev) => ({ ...prev, [id]: true }));
  };

  // Função para abrir o modal com a empresa selecionada
  const abrirModalReclamacao = (empresa) => {
    setEmpresaSelecionada(empresa);
    setModalVisivel(true);
    setTitulo('');
    setDescricao('');
    setSucessoEnvio(false);
  };

  // Função para fechar o modal
  const fecharModal = () => {
    setModalVisivel(false);
    setEmpresaSelecionada(null);
    setTitulo('');
    setDescricao('');
    setSucessoEnvio(false);
  };

  // Função para enviar a reclamação (aqui só simula, depois integra com backend)
  const enviarReclamacao = async () => {
    if (!titulo.trim() || !descricao.trim()) {
      Alert.alert('Campos obrigatórios', 'Preencha todos os campos.');
      return;
    }
    try {
      setEnviando(true);
      // Aqui entraria a integração com o backend
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setSucessoEnvio(true);
      setTimeout(() => fecharModal(), 1800);
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível enviar sua reclamação.');
    } finally {
      setEnviando(false);
    }
  };

  // Função para selecionar imagem
  const selecionarImagem = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permissão necessária',
          'Precisamos de permissão para acessar suas fotos.'
        );
        return;
      }
      const resultado = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });
      if (
        !resultado.canceled &&
        resultado.assets &&
        resultado.assets.length > 0
      ) {
        setImagemReclamacao(resultado.assets[0].uri);
      }
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível selecionar a imagem.');
    }
  };

  return (
    <View style={estilos.container}>
      {/* Seção de Pesquisa */}
      <View style={estilos.searchSection}>
        <Text style={estilos.labelPesquisa}>DESATENDE</Text>
        <View style={estilos.searchContainer}>
          <FontAwesome
            name='search'
            size={20}
            color='#999'
            style={estilos.searchIcon}
          />
          <TextInput
            style={estilos.searchInput}
            placeholder='Digite o nome da empresa...'
            placeholderTextColor='#999'
            value={search}
            onChangeText={setSearch}
            returnKeyType='search'
            accessibilityLabel='Buscar empresa'
          />
        </View>
      </View>

      {/* Banner Principal */}
      <View style={estilos.bannerContainer}>
        <LottieView
          source={require('./imgs/banner.json')}
          autoPlay
          loop
          style={estilos.bannerImagem}
        />
      </View>

      {/* Texto explicativo */}
      <Text style={estilos.textoExplicativo}>
        Relate experiências de atendimento ruim, ajude outros consumidores e
        incentive empresas a melhorarem seus serviços.
      </Text>

      {/* Lista horizontal de empresas */}
      <View style={estilos.empresasSection}>
        <Text style={estilos.empresasSubtitulo}>Empresas Populares</Text>
        {carregandoEmpresas ? (
          <ActivityIndicator
            size='large'
            color='#D84040'
            style={{ marginTop: 20 }}
          />
        ) : (
          <FlatList
            data={empresasPopulares.filter((e) =>
              e.nome.toLowerCase().includes(search.toLowerCase())
            )}
            renderItem={({ item }) => (
              <EmpresaItem
                item={item}
                imageLoaded={imagensCarregadas[item._id]}
                onImageLoad={() => handleImageLoad(item._id)}
                onPress={() => abrirModalReclamacao(item)}
              />
            )}
            keyExtractor={(item) => item._id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={estilos.empresasListContainer}
          />
        )}
      </View>

      {/* Footer */}
      <Rodape
        selecionado='home'
        navegar={(destino) => {
          if (destino === 'home') return; // já está na home
          if (destino === 'perfil') router.push('./perfil');
        }}
      />

      {/* Modal de Reclamação */}
      <Modal
        visible={modalVisivel}
        animationType='slide'
        transparent={true}
        onRequestClose={fecharModal}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.7)',
          }}
        >
          <View
            style={{
              backgroundColor: '#232326',
              borderRadius: 18,
              padding: 20,
              width: '90%',
              maxWidth: 400,
              maxHeight: 500,
            }}
          >
            {/* Dados da empresa */}
            {empresaSelecionada && (
              <View style={{ alignItems: 'center', marginBottom: 18 }}>
                <Image
                  source={{ uri: empresaSelecionada.imagem }}
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 35,
                    marginBottom: 8,
                    backgroundColor: '#2A2A2D',
                  }}
                />
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: '#ECDCBF',
                    marginBottom: 2,
                  }}
                >
                  Nova Reclamação para {empresaSelecionada.nome}
                </Text>
                <Text
                  style={{
                    color: '#bbb',
                    fontSize: 13,
                    marginTop: 2,
                    textAlign: 'center',
                  }}
                >
                  Breve descrição lorem ipsum dolor sit amet.
                </Text>
              </View>
            )}
            {/* Formulário de reclamação */}
            {sucessoEnvio ? (
              <View style={{ alignItems: 'center', marginVertical: 30 }}>
                <FontAwesome
                  name='check-circle'
                  size={60}
                  color='#27ae60'
                />
                <Text style={{ color: '#27ae60', fontSize: 18, marginTop: 10 }}>
                  Reclamação enviada com sucesso!
                </Text>
              </View>
            ) : (
              <ScrollView style={{ maxHeight: 430 }}>
                <View style={{ marginBottom: 12 }}>
                  <Text
                    style={{
                      color: '#ECDCBF',
                      fontWeight: 'bold',
                      marginBottom: 4,
                    }}
                  >
                    Título *
                  </Text>
                  <TextInput
                    style={{
                      backgroundColor: '#2A2A2D',
                      color: '#fff',
                      borderRadius: 8,
                      padding: 8,
                      marginBottom: 8,
                    }}
                    placeholder='Ex: Atendimento ruim'
                    placeholderTextColor='#666'
                    value={titulo}
                    onChangeText={setTitulo}
                  />
                </View>
                <View style={{ marginBottom: 12 }}>
                  <Text
                    style={{
                      color: '#ECDCBF',
                      fontWeight: 'bold',
                      marginBottom: 4,
                    }}
                  >
                    Descrição *
                  </Text>
                  <TextInput
                    style={{
                      backgroundColor: '#2A2A2D',
                      color: '#fff',
                      borderRadius: 8,
                      padding: 8,
                      minHeight: 60,
                      textAlignVertical: 'top',
                    }}
                    placeholder='Descreva o ocorrido...'
                    placeholderTextColor='#666'
                    value={descricao}
                    onChangeText={setDescricao}
                    multiline
                  />
                </View>
                {/* Campo de upload de imagem opcional */}
                <View style={{ marginBottom: 12 }}>
                  <Text
                    style={{
                      color: '#ECDCBF',
                      fontWeight: 'bold',
                      marginBottom: 4,
                    }}
                  >
                    Imagem (opcional)
                  </Text>
                  {imagemReclamacao ? (
                    <View style={{ alignItems: 'center', marginBottom: 8 }}>
                      <Image
                        source={{ uri: imagemReclamacao }}
                        style={{
                          width: 90,
                          height: 90,
                          borderRadius: 10,
                          marginBottom: 6,
                        }}
                      />
                      <Pressable
                        style={{
                          backgroundColor: '#D84040',
                          borderRadius: 6,
                          paddingVertical: 4,
                          paddingHorizontal: 12,
                        }}
                        onPress={() => setImagemReclamacao(null)}
                      >
                        <Text style={{ color: '#fff', fontSize: 14 }}>
                          Remover imagem
                        </Text>
                      </Pressable>
                    </View>
                  ) : (
                    <Pressable
                      style={{
                        backgroundColor: '#D84040',
                        borderRadius: 8,
                        padding: 10,
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'center',
                      }}
                      onPress={selecionarImagem}
                    >
                      <FontAwesome
                        name='camera'
                        size={18}
                        color='#fff'
                        style={{ marginRight: 8 }}
                      />
                      <Text
                        style={{
                          color: '#fff',
                          fontWeight: 'bold',
                          fontSize: 15,
                        }}
                      >
                        Selecionar imagem
                      </Text>
                    </Pressable>
                  )}
                </View>
                <Pressable
                  style={{
                    backgroundColor: '#D84040',
                    borderRadius: 8,
                    padding: 12,
                    alignItems: 'center',
                    marginTop: 8,
                    opacity: enviando ? 0.7 : 1,
                  }}
                  onPress={enviarReclamacao}
                  disabled={enviando}
                >
                  <Text
                    style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}
                  >
                    Enviar Reclamação
                  </Text>
                </Pressable>
                <Pressable
                  style={{ marginTop: 10, alignItems: 'center' }}
                  onPress={fecharModal}
                >
                  <Text style={{ color: '#bbb', fontSize: 15 }}>Cancelar</Text>
                </Pressable>
              </ScrollView>
            )}
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}
