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

export default function HomeScreen() {
  // Estados para os campos de reclamação (exemplo de "CRud" futuro)
  const [empresa, setEmpresa] = useState('');
  const [tituloReclamacao, setTituloReclamacao] = useState('');
  const [descricaoReclamacao, setDescricaoReclamacao] = useState('');
  const [imagemOpcional, setImagemOpcional] = useState('');

  // Estado para controlar o carregamento das imagens
  const [imagensCarregadas, setImagensCarregadas] = useState({});

  // Hook para navegação entre telas
  const router = useRouter();

  // Dados de exemplo para a lista de empresas
  const empresasExemplo = [
    {
      id: '1',
      nome: 'Empresa Oii',
      imagem: 'https://via.placeholder.com/150',
    },
    {
      id: '2',
      nome: 'Empresa Xauu',
      imagem: 'https://via.placeholder.com/150',
    },
    {
      id: '3',
      nome: 'Empresa ata',
      imagem: 'https://via.placeholder.com/150',
    },
    {
      id: '4',
      nome: 'Empresa hum',
      imagem: 'https://via.placeholder.com/150',
    },
    {
      id: '5',
      nome: 'Empresa oi',
      imagem: 'https://via.placeholder.com/150',
    },
  ];

  // Função para marcar uma imagem como carregada
  const handleImageLoad = (id) => {
    setImagensCarregadas((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  // Renderiza cada item da lista de empresas
  const renderEmpresa = ({ item }) => {
    const imageLoaded = imagensCarregadas[item.id];

    return (
      <Pressable
        onPress={() => {
          // Navegação futura para detalhes da empresa
          console.log(`Empresa selecionada: ${item.nome}`);
        }}
        android_ripple={{ color: 'rgba(0, 0, 0, 0.1)' }}
        style={({ pressed }) => [
          estilos.empresaItem,
          pressed && { opacity: 0.7 },
        ]}
      >
        <View style={estilos.empresaImagemContainer}>
          {/* Placeholder com logo da empresa */}
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

          {/* Imagem real da empresa */}
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
          />
        </View>
      </View>

      {/* Banner Principal */}
      <View style={estilos.bannerContainer}>
        <Image
          style={estilos.bannerImagem}
          source={require('./imgs/desatendeHome.jpg')}
        />
      </View>

      {/* Texto explicativo */}
      <Text style={estilos.textoExplicativo}>
        Aqui você pode relatar experiências de atendimento ruim, ajudar outros
        consumidores e incentivar empresas a melhorarem seus serviços.
      </Text>

      {/* Lista horizontal de empresas */}
      <View style={estilos.empresasSection}>
        <Text style={estilos.empresasSubtitulo}>Empresas Populares</Text>

        {/* Lista horizontal de empresas com rolagem */}
        <FlatList
          data={empresasExemplo}
          renderItem={renderEmpresa}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={estilos.empresasListContainer}
        />
      </View>

      {/* Footer */}
      <View style={estilos.footer}>
        {/* Ícone Home - selecionado */}
        <Pressable
          android_ripple={{ color: 'rgba(0, 0, 0, 0.1)' }}
          style={estilos.footerItem}
        >
          <View style={estilos.footerItemSelecionado}>
            <FontAwesome
              name='home'
              size={24}
              color='#A31D1D'
            />
            <Text style={[estilos.footerTexto, { color: 'white' }]}>Home</Text>
          </View>
        </Pressable>

        {/* Ícone Perfil - ao pressionar, navega com transição suave para a tela de Perfil */}
        <Pressable
          onPress={() => {
            router.push('./perfil');
          }}
          android_ripple={{ color: 'rgba(0, 0, 0, 0.1)' }}
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
