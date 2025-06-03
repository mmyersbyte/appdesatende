import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const CORES = {
  fundoPrincipal: '#1A1A1D',
  corPrimaria: '#D84040',
  textoPrincipal: 'white',
  textoSecundario: '#555',
  bordaBranca: 'white',
};

const estilos = StyleSheet.create({
  rodape: {
    position: 'absolute',
    bottom: 0,
    width: '110%',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: CORES.bordaBranca,
    paddingVertical: 12,
    justifyContent: 'space-around',
    backgroundColor: CORES.fundoPrincipal,
  },
  itemRodape: {
    flex: 1,
    alignItems: 'center',
  },
  itemSelecionado: {
    flexDirection: 'column',
    alignItems: 'center',
    borderBottomColor: CORES.corPrimaria,
    paddingBottom: 4,
  },
  itemNaoSelecionado: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 4,
  },
  textoRodape: {
    fontSize: 12,
    marginTop: 2,
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
        <View
          style={
            selecionado === 'home'
              ? estilos.itemSelecionado
              : estilos.itemNaoSelecionado
          }
        >
          <FontAwesome
            name='home'
            size={24}
            color={
              selecionado === 'home' ? CORES.corPrimaria : CORES.textoSecundario
            }
          />
          <Text
            style={[
              estilos.textoRodape,
              {
                color: selecionado === 'home' ? 'white' : CORES.textoSecundario,
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
        <View
          style={
            selecionado === 'perfil'
              ? estilos.itemSelecionado
              : estilos.itemNaoSelecionado
          }
        >
          <FontAwesome
            name='user'
            size={24}
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
                  selecionado === 'perfil' ? 'white' : CORES.textoSecundario,
              },
            ]}
          >
            Seu Perfil
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
