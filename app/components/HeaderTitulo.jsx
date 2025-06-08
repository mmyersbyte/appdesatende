import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HeaderTitulo({ titulo, tamanho = 32 }) {
  return (
    <View style={estilos.headerContainer}>
      <Text style={[estilos.headerTitulo, { fontSize: tamanho }]}>
        {titulo}
      </Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  headerContainer: {
    paddingTop: 38,
    paddingBottom: 18,
    backgroundColor: 'transparent',
    alignItems: 'center',
    borderBottomWidth: 0,
    marginBottom: 2,
  },
  headerTitulo: {
    fontSize: 32,
    fontWeight: '900',
    color: '#D84040',
    letterSpacing: 2.5,
    textAlign: 'center',
    textShadowColor: 'rgba(216, 64, 64, 0.3)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 8,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
});
