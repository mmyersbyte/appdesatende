import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
// Importa o hook de navegação do Expo Router para navegar entre telas
import { useRouter } from 'expo-router';

export default function PerfilScreen() {
  // Estado para armazenar o nome do usuário (futuro CRUD)
  const [userName, setUserName] = useState('Usuário');
  // Estado para armazenar a URL ou caminho da foto de perfil (futuro CRUD)
  const [profileImage, setProfileImage] = useState(null);

  // Hook para navegação
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Contedo principal */}
      <View style={styles.content}>
        {/* Mensagem de boas indas e nome do usuário */}
        <Text style={styles.welcome}>Olá, bem vindo</Text>
        <Text style={styles.userName}>{userName}</Text>

        {/* Container para adicionarfto de perfil */}
        <TouchableOpacity
          style={styles.photoContainer}
          onPress={() => {
            // Futura implementação: abrir galeria ou câmera para selecionar a foto
            console.log('Abrir seletor de foto de perfil');
          }}
        >
          {profileImage ? (
            // Se existir foto de perfil, exibe a imagem
            <Image
              source={{ uri: profileImage }}
              style={styles.profileImage}
            />
          ) : (
            // Se n gem foto, exibe um ícone de câmera
            <FontAwesome
              name='camera'
              size={40}
              color='#666'
            />
          )}
          <Text style={styles.photoText}>Adicionar foto de perfil</Text>
        </TouchableOpacity>
      </View>

      {/* Footer com navegação */}
      <View style={styles.footer}>
        {/* Ícone Home  */}
        <TouchableOpacity
          style={styles.footerItem}
          onPress={() => router.push('/ola')}
        >
          <View style={styles.footerItemNaoSelecionado}>
            <FontAwesome
              name='home'
              size={24}
              color='#555'
            />
            <Text style={[styles.footerTexto, { color: '#555' }]}>Home</Text>
          </View>
        </TouchableOpacity>

        {/* Ícone Perfil - ativo */}
        <TouchableOpacity style={styles.footerItem}>
          <View style={styles.footerItemSelecionado}>
            <FontAwesome
              name='user'
              size={24}
              color='#ba68c8'
            />
            <Text style={[styles.footerTexto, { color: 'white' }]}>
              Seu Perfil
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Estilos da tela
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1D',
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 60, // Espaço para o footer
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 26,
    color: 'white',
    marginBottom: 8,
  },
  userName: {
    fontSize: 22,
    color: '#ba68c8',
    marginBottom: 20,
  },
  photoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  photoText: {
    marginTop: 8,
    color: 'white',
    fontSize: 14,
  },
  /* Estilos do Footer */
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'white',
    paddingVertical: 12,
    justifyContent: 'space-around',
  },
  footerItem: {
    flex: 1,
    alignItems: 'center',
  },
  footerItemSelecionado: {
    flexDirection: 'column',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'white',
    paddingBottom: 4,
  },
  footerItemNaoSelecionado: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 4,
  },
  footerTexto: {
    fontSize: 12,
    marginTop: 2,
  },
});
