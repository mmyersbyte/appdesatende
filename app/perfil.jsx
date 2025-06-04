//PERFIL CLIENTEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
import { useState } from 'react';
import { View } from 'react-native';

import estilos from './estilos/estilosPerfil';

import { FontAwesome } from '@expo/vector-icons';
// Importa o hook de navegação do Expo Router para navegar entre telas
import { useRouter } from 'expo-router';

import Rodape from './components/Rodape';

export default function PerfilScreen() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#1A1A1D',
        justifyContent: 'flex-end',
      }}
    >
      <Rodape
        selecionado='perfil'
        navegar={(destino) => {
          if (destino === 'home') router.push('/home');
          if (destino === 'perfil') router.push('/perfil');
        }}
      />
    </View>
  );
}
