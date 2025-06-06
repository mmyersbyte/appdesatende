import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

// PALETA DRACULA PARA RODAPE
const CORES = {
  fundoPrincipal: '#282a36', // Dracula background
  corPrimaria: '#bd93f9', // Dracula purple para selecionado
  textoPrincipal: '#f8f8f2', // Dracula foreground
  textoSecundario: '#6272a4', // Dracula comment
  bordaSutil: '#44475a', // Dracula current line
};

const estilos = StyleSheet.create({
  rodape: {
    position: 'absolute',
    bottom: 0,
    width: '110%',
    height: 70, // Altura absolutamente fixa
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: CORES.bordaSutil,
    backgroundColor: CORES.fundoPrincipal,
    paddingHorizontal: 0, // Remove padding lateral
  },
  itemRodape: {
    width: '50%', // Largura fixa para cada item (2 itens = 50% cada)
    height: 70, // Mesma altura do container
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  // Container interno com dimensões absolutamente fixas
  itemContainer: {
    width: 60, // Largura fixa para o container interno
    height: 46, // Altura fixa para o container interno
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconeFixo: {
    width: 22, // Largura fixa para o ícone
    height: 22, // Altura fixa para o ícone
    textAlign: 'center',
    marginBottom: 4,
  },
  textoRodape: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    width: 60, // Largura fixa para o texto
    height: 16, // Altura fixa para o texto
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
