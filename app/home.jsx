// HOME CLIENTE!!
import { useState } from 'react';
import estilos from './estilos/estilosHome';
import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
// Importa o hook de navegação do Expo Router
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import Rodape from './components/Rodape';
import EmpresaItem from './components/EmpresaItem';

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [imagensCarregadas, setImagensCarregadas] = useState({});
  const router = useRouter();

  const empresasExemplo = [
    { id: '1', nome: 'Empresa Oii', imagem: 'https://via.placeholder.com/150' },
    {
      id: '2',
      nome: 'Empresa Xauu',
      imagem: 'https://via.placeholder.com/150',
    },
    { id: '3', nome: 'Empresa ata', imagem: 'https://via.placeholder.com/150' },
    { id: '4', nome: 'Empresa hum', imagem: 'https://via.placeholder.com/150' },
    { id: '5', nome: 'Empresa oi', imagem: 'https://via.placeholder.com/150' },
  ];

  const handleImageLoad = (id) => {
    setImagensCarregadas((prev) => ({ ...prev, [id]: true }));
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
        <FlatList
          data={empresasExemplo.filter((e) =>
            e.nome.toLowerCase().includes(search.toLowerCase())
          )}
          renderItem={({ item }) => (
            <EmpresaItem
              item={item}
              imageLoaded={imagensCarregadas[item.id]}
              onImageLoad={() => handleImageLoad(item.id)}
              onPress={() => {}}
            />
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={estilos.empresasListContainer}
        />
      </View>

      {/* Footer */}
      <Rodape
        selecionado='home'
        navegar={(destino) => {
          if (destino === 'home') return; // já está na home
          if (destino === 'perfil') router.push('./perfil');
        }}
      />
    </View>
  );
}
