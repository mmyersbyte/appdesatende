import React from 'react';
import { Pressable, View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import estilos from '../estilos/estilosLogin';

export default function CustomButton({ title, iconName, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [
        estilos.botao,
        pressed && estilos.botaoPressionado,
      ]}
      onPress={onPress}
    >
      <View style={estilos.linhaBotao}>
        <View style={estilos.iconeEsquerdo}>
          {iconName && (
            <FontAwesome
              name={iconName}
              size={22}
              color={estilos.textoBotao.color}
            />
          )}
        </View>
        <View style={estilos.textoCentral}>
          <Text style={estilos.textoBotao}>{title}</Text>
        </View>
        <View style={estilos.iconeDireito} />
      </View>
    </Pressable>
  );
}
