import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HeaderTitulo({ titulo }) {
  return (
    <View style={estilos.headerContainer}>
      <Text style={estilos.headerTitulo}>{titulo}</Text>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D84040',
    letterSpacing: 0.5,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.18)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
});
