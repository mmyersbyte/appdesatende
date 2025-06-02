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

  const renderEmpresa = ({ item }) => {
    const imageLoaded = imagensCarregadas[item.id];
    return (
      <Pressable
        onPress={() => {}}
        android_ripple={{ color: 'rgba(0, 0, 0, 0.1)' }}
        style={({ pressed }) => [
          estilos.empresaItem,
          pressed && { opacity: 0.7 },
        ]}
      >
        <View style={estilos.empresaImagemContainer}>
          {!imageLoaded && (
            <View style={estilos.placeholderContainer}>
              <Text style={estilos.placeholderText}>{item.nome.charAt(0)}</Text>
              <ActivityIndicator
                size='small'
                color='#ba68c8'
                style={estilos.loadingIndicator}
              />
            </View>
          )}
          <Image
            source={{ uri: item.imagem }}
            style={[estilos.empresaImagem, !imageLoaded && { opacity: 0 }]}
            onLoad={() => handleImageLoad(item.id)}
            onError={() => handleImageLoad(item.id)}
          />
        </View>
        <Text
          style={estilos.empresaNome}
          numberOfLines={2}
          ellipsizeMode='tail'
        >
          {item.nome}
        </Text>
      </Pressable>
    );
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
          renderItem={renderEmpresa}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={estilos.empresasListContainer}
        />
      </View>

      {/* Footer */}
      <View style={estilos.footer}>
        <Pressable style={estilos.footerItem}>
          <View style={estilos.footerItemSelecionado}>
            <FontAwesome
              name='home'
              size={24}
              color='#A31D1D'
            />
            <Text style={[estilos.footerTexto, { color: 'white' }]}>Home</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => router.push('./perfil')}
          style={estilos.footerItem}
        >
          <View style={estilos.footerItemNaoSelecionado}>
            <FontAwesome
              name='user'
              size={24}
              color='#555'
            />
            <Text style={[estilos.footerTexto, { color: '#555' }]}>
              Seu Perfil
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
