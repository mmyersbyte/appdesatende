// HOME CLIENTE!!
import { useState } from 'react';
import estilos from './estilos/estilosHome';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
// Importa o hook de navegação do Expo Router
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import Rodape from './components/Rodape';
import EmpresaItem from './components/EmpresaItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api/axios';
import ModalCriarReclamacao from './components/ModalCriarReclamacao';
import { useEmpresas } from './hooks/useEmpresas';
import { useFeedback } from './hooks/useFeedback';
import HeaderTitulo from './components/HeaderTitulo';

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [imagensCarregadas, setImagensCarregadas] = useState({});
  const router = useRouter();
  // Busca empresas reais do backend via hook
  const { empresas, carregando: carregandoEmpresas } = useEmpresas();
  // Filtra as 5 primeiras empresas como populares
  const empresasPopulares = empresas.slice(0, 8);

  // Estados para modal e empresa selecionada
  const [modalVisivel, setModalVisivel] = useState(false);
  const [empresaSelecionada, setEmpresaSelecionada] = useState(null);

  const feedback = useFeedback();

  const handleImageLoad = (id) => {
    setImagensCarregadas((prev) => ({ ...prev, [id]: true }));
  };

  // Função para abrir o modal com a empresa selecionada
  const abrirModalReclamacao = (empresa) => {
    setEmpresaSelecionada(empresa);
    setModalVisivel(true);
  };

  // Função para fechar o modal
  const fecharModal = () => {
    setModalVisivel(false);
    setEmpresaSelecionada(null);
  };

  return (
    <View style={estilos.container}>
      <HeaderTitulo titulo='Desatende' />

      {/* Seção de Pesquisa */}
      <View style={estilos.searchSection}>
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

      {/* Banner Principal - MOVIDO PARA PRÓXIMO DO INPUT */}
      <View style={estilos.bannerContainer}>
        <LottieView
          source={require('./imgs/banner2.json')}
          autoPlay
          loop
          style={estilos.bannerImagem}
        />
      </View>

      {/* Texto explicativo - REDUZIDO */}
      <Text style={estilos.textoExplicativo}>
        Relate experiências ruins e ajude outros consumidores
      </Text>

      {/* Lista horizontal de empresas */}
      <View style={estilos.empresasSection}>
        <Text style={estilos.empresasSubtitulo}>Empresas Populares</Text>
        {carregandoEmpresas ? (
          <ActivityIndicator
            size='large'
            color='#8be9fd'
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
          if (destino === 'home') return;
          if (destino === 'perfil') router.push('./perfil');
        }}
      />

      {/* Feedback global */}
      {feedback.loading && (
        <Text
          style={{ color: '#8be9fd', textAlign: 'center', marginBottom: 8 }}
        >
          Enviando reclamação...
        </Text>
      )}
      {feedback.success && (
        <Text
          style={{ color: '#50fa7b', textAlign: 'center', marginBottom: 8 }}
        >
          {feedback.success}
        </Text>
      )}
      {feedback.error && (
        <Text
          style={{ color: '#ffb86c', textAlign: 'center', marginBottom: 8 }}
        >
          {feedback.error}
        </Text>
      )}

      {/* Modal de Reclamação */}
      <ModalCriarReclamacao
        visible={modalVisivel}
        empresa={empresaSelecionada}
        onClose={fecharModal}
        onSubmit={async (
          { titulo, descricao, contato, empresaId },
          imagemUri
        ) => {
          try {
            feedback.setLoading(true);
            const token = await AsyncStorage.getItem('token');
            if (!token) {
              feedback.showError(
                'Usuário não autenticado. Faça login novamente.'
              );
              return;
            }

            /**
             * Construção do FormData seguindo padrões REST
             * Inclui validação e tratamento do campo contato
             */
            const formData = new FormData();
            formData.append('titulo', titulo);
            formData.append('descricao', descricao);
            formData.append(
              'empresa',
              String(empresaId || empresaSelecionada?._id)
            );

            // Adiciona contato apenas se fornecido e válido
            if (contato && contato.trim()) {
              formData.append('contato', contato.trim());
            }

            /**
             * Processamento de imagem mantendo compatibilidade
             * com sistema de upload existente
             */
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

            // Requisição para API seguindo padrões RESTful
            await api.post('/reclamacoes', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
              },
            });

            // Sucesso - o feedback será exibido pelo modal
            // feedback.showSuccess('Reclamação enviada com sucesso!'); // REMOVIDO - duplicado
            // setTimeout(() => {
            //   feedback.resetFeedback();
            //   fecharModal();
            // }, 1800); // REMOVIDO - será gerenciado pelo modal
          } catch (e) {
            feedback.showError('Não foi possível enviar sua reclamação.');
            console.log(
              'Erro ao enviar reclamação:',
              e?.response?.data || e.message || e
            );
          } finally {
            feedback.setLoading(false);
          }
        }}
      />
    </View>
  );
}
