// HOME CLIENTE!!
import { useState } from 'react';
import estilos from './estilos/estilosHome';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
// Importa o hook de navegação do Expo Router
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import Rodape from './components/Rodape';
import EmpresaItem from './components/EmpresaItem';
import * as ImagePicker from 'expo-image-picker';
import { buscarEmpresas } from './api/empresas'; // Importa a função de busca
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api/axios';
import ModalCriarReclamacao from './components/ModalCriarReclamacao';
import { useEmpresas } from './hooks/useEmpresas';
import { useFeedback } from './hooks/useFeedback';

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [imagensCarregadas, setImagensCarregadas] = useState({});
  const router = useRouter();

  // Busca empresas reais do backend via hook
  const { empresas, carregando: carregandoEmpresas } = useEmpresas();

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

  const feedback = useFeedback();

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

      {/* Feedback global */}
      {feedback.loading && (
        <Text
          style={{ color: '#D84040', textAlign: 'center', marginBottom: 8 }}
        >
          Enviando reclamação...
        </Text>
      )}
      {feedback.success && (
        <Text
          style={{ color: '#27ae60', textAlign: 'center', marginBottom: 8 }}
        >
          {feedback.success}
        </Text>
      )}
      {feedback.error && (
        <Text
          style={{ color: '#D84040', textAlign: 'center', marginBottom: 8 }}
        >
          {feedback.error}
        </Text>
      )}

      {/* Modal de Reclamação */}
      <ModalCriarReclamacao
        visible={modalVisivel}
        empresa={empresaSelecionada}
        onClose={fecharModal}
        onSubmit={async ({ titulo, descricao, empresaId }, imagemUri) => {
          try {
            feedback.setLoading(true);
            const token = await AsyncStorage.getItem('token');
            if (!token) {
              feedback.showError(
                'Usuário não autenticado. Faça login novamente.'
              );
              return;
            }
            const formData = new FormData();
            formData.append('titulo', titulo);
            formData.append('descricao', descricao);
            formData.append(
              'empresa',
              String(empresaId || empresaSelecionada?._id)
            );
            if (imagemUri) {
              const filename = imagemUri.split('/').pop();
              const match = filename ? /\.(\w+)$/.exec(filename) : null;
              const type = match ? `image/${match[1]}` : 'image';
              formData.append('imagem', {
                uri: imagemUri,
                name: filename ?? 'foto.jpg',
                type,
              });
            }
            await api.post('/reclamacoes', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
              },
            });
            feedback.showSuccess('Reclamação enviada com sucesso!');
            setTimeout(() => {
              feedback.resetFeedback();
              fecharModal();
            }, 1800);
          } catch (e) {
            feedback.showError('Não foi possível enviar sua reclamação.');
            console.log(
              'Erro ao enviar reclamação:',
              e?.response?.data || e.message || e
            );
          }
        }}
      />
    </View>
  );
}
