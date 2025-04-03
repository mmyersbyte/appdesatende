//configuracoes empresa
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Image,
  Alert,
  Platform, //IOS OU ANDROIDER
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

// Importa os estilos da tela
import estilos from './estilos/estilosConfiguracoes';

// Componente da tela de configurações da empresa
export default function ConfiguracoesEmpresaScreen() {
  // Hook para navegação entre telas
  const router = useRouter();

  // Estados para os dados da empresa
  const [fotoPerfil, setFotoPerfil] = useState(
    'https://via.placeholder.com/150'
  ); // URL da foto de perfil (inicialmente um placeholder)
  const [bio, setBio] = useState(''); // Bio da empresa

  // Estado para controlar o carregamento da imagem
  const [imagemCarregando, setImagemCarregando] = useState(false);

  // Função para selecionar uma imagem da galeria DSTV
  // const selecionarImagem = async () => {
  //   try {
  //     setImagemCarregando(true);
  //     const result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       allowsEditing: true,
  //       aspect: [1, 1],
  //       quality: 1,
  //     });

  //     if (!result.canceled) {
  //       setFotoPerfil(result.assets[0].uri);
  //       //  adicionar a lógica para fazer o upload da imagem para o servidor
  //       // e atualizar a URL no estado fotoPerfil.
  //     }
  //   } catch (error) {
  //     console.error('Erro ao selecionar imagem:', error);
  //     Alert.alert('Erro', 'Não foi possível selecionar a imagem.');
  //   } finally {
  //     setImagemCarregando(false);
  //   }
  // };

  // Função para salvar as alterações no perfil
  const salvarAlteracoes = () => {
    // lógica para salvar a bio e a foto de perfil no banco de dados.
    Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
  };

  // Função para navegar de volta para o dashboard
  const navegarParaDashboard = () => {
    // Corrigido: Usando '/' para navegar para a raiz (index)
    router.push('/app');
  };

  return (
    <View style={estilos.container}>
      {/* Título da tela */}
      <Text style={estilos.titulo}>Configurações da Empresa</Text>

      {/* Seção da foto de perfil */}
      <View style={estilos.secaoFotoPerfil}>
        <Text style={estilos.labelFotoPerfil}>Foto de Perfil</Text>
        <Pressable
          onPress={selecionarImagem}
          disabled={imagemCarregando}
          style={estilos.botaoAlterarFoto}
        >
          {imagemCarregando ? (
            <ActivityIndicator
              size='small'
              color='#ba68c8'
            />
          ) : (
            <View style={estilos.containerFotoPerfil}>
              <Image
                source={{ uri: fotoPerfil }}
                style={estilos.fotoPerfil}
              />
              <View style={estilos.overlayFotoPerfil} />
              <FontAwesome
                name='camera'
                size={24}
                color='white'
                style={estilos.iconeCamera}
              />
            </View>
          )}
        </Pressable>
      </View>

      {/* Seção da bio */}
      <View style={estilos.secaoBio}>
        <Text style={estilos.labelBio}>Bio</Text>
        <TextInput
          style={estilos.inputBio}
          placeholder='Escreva uma breve descrição sobre a empresa...'
          placeholderTextColor='#999'
          multiline
          numberOfLines={4}
          value={bio}
          onChangeText={setBio}
        />
      </View>

      {/* Botão para salvar as alterações */}
      <Pressable
        style={estilos.botaoSalvar}
        onPress={salvarAlteracoes}
      >
        <Text style={estilos.textoBotaoSalvar}>Salvar Alterações</Text>
      </Pressable>

      {/* Footer */}
      <View style={estilos.footer}>
        {/* Ícone Home - ao pressionar, navega com transição suave para a tela Home */}
        <Pressable
          style={estilos.footerItem}
          onPress={navegarParaDashboard}
        >
          <View style={estilos.footerItemNaoSelecionado}>
            <FontAwesome
              name='dashboard'
              size={24}
              color='#555'
            />
            <Text style={[estilos.footerTexto, { color: '#555' }]}>
              Dashboard
            </Text>
          </View>
        </Pressable>

        {/* Ícone Perfil - selecionado */}
        <Pressable style={estilos.footerItem}>
          <View style={estilos.footerItemSelecionado}>
            <FontAwesome
              name='cog'
              size={24}
              color='#ba68c8'
            />
            <Text style={[estilos.footerTexto, { color: 'white' }]}>
              Configurações
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
