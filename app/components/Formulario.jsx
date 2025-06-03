import React from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet } from 'react-native';
import CustomButton from './CustomButton';

const CORES = {
  corPrimaria: '#D84040',
  corPrimariaEscura: '#A31D1D',
  textoPrincipal: '#ECDCBF',
  textoEscuro: '#333',
  branco: '#FFF',
  bordaInput: '#CCC',
};

const estilos = StyleSheet.create({
  formularioContainer: {
    alignItems: 'center',
  },
  tituloFormulario: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    color: CORES.corPrimaria,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: CORES.bordaInput,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    color: CORES.textoEscuro,
  },
});

export default function Formulario({
  titulo,
  campos, // array de objetos: { placeholder, value, onChangeText, ...props }
  botoes, // array de objetos: { title, onPress, ...props }
  children,
}) {
  return (
    <ScrollView contentContainerStyle={estilos.formularioContainer}>
      <Text style={estilos.tituloFormulario}>{titulo}</Text>
      {campos.map((campo, idx) => (
        <TextInput
          key={idx}
          style={estilos.input}
          placeholder={campo.placeholder}
          placeholderTextColor='#999'
          value={campo.value}
          onChangeText={campo.onChangeText}
          {...campo.props}
        />
      ))}
      {children}
      {botoes.map((botao, idx) => (
        <CustomButton
          key={idx}
          title={botao.title}
          onPress={botao.onPress}
          disabled={botao.disabled}
        />
      ))}
    </ScrollView>
  );
}
