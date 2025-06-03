import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';

const CORES = {
  corPrimaria: '#D84040',
  corPrimariaEscura: '#A31D1D',
  textoPrincipal: 'white',
};

const estilos = StyleSheet.create({
  botao: {
    backgroundColor: CORES.corPrimaria,
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    minWidth: 70,
  },
  botaoPressionado: {
    opacity: 0.7,
  },
  linhaBotao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  textoBotao: {
    color: CORES.textoPrincipal,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default function CustomButton({ title, onPress, disabled }) {
  return (
    <Pressable
      style={({ pressed }) => [
        estilos.botao,
        pressed && estilos.botaoPressionado,
        disabled && { opacity: 0.5 },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={estilos.linhaBotao}>
        <Text style={estilos.textoBotao}>{title}</Text>
      </View>
    </Pressable>
  );
}
