import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

// PALETA PARA RODAPE
const CORES = {
  fundoPrincipal: '#222831', // Background igual ao das telas
  corPrimaria: '#F2F2F2', // Vermelho do Desatende para selecionado
  textoPrincipal: '#f8f8f2', // Dracula foreground
  textoSecundario: 'gray', // Dracula cyan - mais vibrante para ícones
  bordaSutil: '#44475a', // Dracula current line
};

const estilos = StyleSheet.create({
  rodape: {
    position: 'absolute',
    bottom: 0,
    left: 5,
    right: 5,
    width: '105%',
    height: 70,
    flexDirection: 'row',
    borderTopWidth: 2,
    borderTopColor: CORES.bordaSutil,
    backgroundColor: CORES.fundoPrincipal,
    paddingHorizontal: 0,
    zIndex: 1000,
  },
  itemRodape: {
    width: '50%',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  itemContainer: {
    width: 60,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconeFixo: {
    textAlign: 'center',
    marginBottom: 4,
  },
  textoRodape: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    width: 60,
    height: 16,
  },
});

export default function Rodape({ selecionado, navegar }) {
  return (
    <View style={estilos.rodape}>
      {/* Home */}
      <Pressable
        style={estilos.itemRodape}
        onPress={() => navegar('home')}
      >
        <View style={estilos.itemContainer}>
          <FontAwesome
            name='home'
            size={22}
            style={estilos.iconeFixo}
            color={
              selecionado === 'home' ? CORES.corPrimaria : CORES.textoSecundario
            }
          />
          <Text
            style={[
              estilos.textoRodape,
              {
                color:
                  selecionado === 'home'
                    ? CORES.textoPrincipal
                    : CORES.textoSecundario,
              },
            ]}
          >
            Home
          </Text>
        </View>
      </Pressable>

      {/* Perfil */}
      <Pressable
        style={estilos.itemRodape}
        onPress={() => navegar('perfil')}
      >
        <View style={estilos.itemContainer}>
          <FontAwesome
            name='user'
            size={22}
            style={estilos.iconeFixo}
            color={
              selecionado === 'perfil'
                ? CORES.corPrimaria
                : CORES.textoSecundario
            }
          />
          <Text
            style={[
              estilos.textoRodape,
              {
                color:
                  selecionado === 'perfil'
                    ? CORES.textoPrincipal
                    : CORES.textoSecundario,
              },
            ]}
          >
            Perfil
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
