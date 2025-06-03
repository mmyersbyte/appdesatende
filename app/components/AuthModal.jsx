import React from 'react';
import { Modal, View, StyleSheet } from 'react-native';

const CORES = {
  branco: '#FFF',
};

const estilos = StyleSheet.create({
  modalFundo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  modalConteudo: {
    width: '100%',
    backgroundColor: CORES.branco,
    borderRadius: 12,
    padding: 20,
  },
});

export default function AuthModal({
  visible,
  onRequestClose,
  renderizarFormulario,
}) {
  return (
    <Modal
      visible={visible}
      animationType='slide'
      transparent
      onRequestClose={onRequestClose}
    >
      {/* Fundo semi-transparente para o modal */}
      <View style={estilos.modalFundo}>
        {/* Conteúdo do modal */}
        <View style={estilos.modalConteudo}>{renderizarFormulario()}</View>
      </View>
    </Modal>
  );
}
