import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';

// PALETA DRACULA DEFAULT
const CORES = {
  corPrimaria: '#8be9fd', // Mudança: Dracula cyan ao invés de vermelho
  corPrimariaEscura: '#6be7fc', // Mudança: cyan mais escuro
  textoPrincipal: 'white',
};

const estilos = StyleSheet.create({
  botao: {
    backgroundColor: CORES.corPrimaria, // Será sobrescrito pela prop cor se fornecida
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

/**
 * 🔘 CUSTOM BUTTON COMPONENT
 *
 * @param {string} title - Texto do botão
 * @param {function} onPress - Função de clique
 * @param {boolean} disabled - Se o botão está desabilitado
 * @param {number} height - Altura personalizada
 * @param {number} width - Largura personalizada
 * @param {string} cor - Cor de fundo personalizada (nova prop!)
 */
export default function CustomButton({
  title,
  onPress,
  disabled,
  height,
  width,
  cor, // Nova prop para cor personalizada
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        estilos.botao,
        pressed && estilos.botaoPressionado,
        disabled && { opacity: 0.5 },
        height && { height },
        width && { width },
        cor && { backgroundColor: cor }, // Aplica cor personalizada se fornecida
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
