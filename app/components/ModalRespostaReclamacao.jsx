import React from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const CORES = {
  fundoModal: 'rgba(0, 0, 0, 0.7)',
  fundoClaro: '#2A2A2D',
  fundoMaisClaro: '#3A3A3D',
  corPrimaria: '#D84040',
  textoPrincipal: '#ECDCBF',
  textoSuave: 'rgba(255, 255, 255, 0.7)',
};

const estilos = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: CORES.fundoModal,
  },
  modalContent: {
    backgroundColor: CORES.fundoClaro,
    margin: 20,
    borderRadius: 10,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: CORES.corPrimaria,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: CORES.textoPrincipal,
  },
  modalScrollView: {
    padding: 15,
  },
  reclamacaoDetalhes: {
    marginBottom: 20,
  },
  reclamacaoDetalheUsuario: {
    fontSize: 14,
    fontWeight: 'bold',
    color: CORES.textoPrincipal,
  },
  reclamacaoDetalheData: {
    fontSize: 12,
    color: CORES.textoSuave,
    marginBottom: 10,
  },
  reclamacaoDetalheTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: CORES.textoPrincipal,
    marginBottom: 5,
  },
  reclamacaoDetalheDescricao: {
    fontSize: 14,
    color: CORES.textoPrincipal,
    lineHeight: 20,
  },
  respostaContainer: {
    marginBottom: 20,
  },
  respostaLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: CORES.textoPrincipal,
    marginBottom: 10,
  },
  respostaInput: {
    backgroundColor: CORES.fundoMaisClaro,
    borderRadius: 8,
    padding: 12,
    color: CORES.textoPrincipal,
    textAlignVertical: 'top',
    minHeight: 120,
  },
  modalBotoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
  modalBotao: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoCancelar: {
    backgroundColor: CORES.fundoMaisClaro,
    marginRight: 5,
  },
  botaoEnviar: {
    backgroundColor: CORES.corPrimaria,
    marginLeft: 5,
  },
  textoBotaoCancelar: {
    color: CORES.textoPrincipal,
    fontWeight: 'bold',
  },
  textoBotaoEnviar: {
    color: CORES.textoPrincipal,
    fontWeight: 'bold',
  },
});

export default function ModalRespostaReclamacao({
  visible,
  onClose,
  reclamacao,
  resposta,
  setResposta,
  onEnviar,
}) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType='slide'
      onRequestClose={onClose}
    >
      <View style={estilos.modalContainer}>
        <View style={estilos.modalContent}>
          <View style={estilos.modalHeader}>
            <Text style={estilos.modalTitulo}>Responder Reclamação</Text>
            <Pressable onPress={onClose}>
              <FontAwesome
                name='close'
                size={24}
                color='#fff'
              />
            </Pressable>
          </View>
          {reclamacao && (
            <ScrollView style={estilos.modalScrollView}>
              <View style={estilos.reclamacaoDetalhes}>
                <Text style={estilos.reclamacaoDetalheUsuario}>
                  Cliente: {reclamacao.usuario}
                </Text>
                <Text style={estilos.reclamacaoDetalheData}>
                  Data: {reclamacao.data}
                </Text>
                {reclamacao.imagem && reclamacao.imagem.data && (
                  <Image
                    source={{
                      uri: `data:${reclamacao.imagem.contentType};base64,${reclamacao.imagem.data}`,
                    }}
                    style={{
                      width: 180,
                      height: 180,
                      borderRadius: 12,
                      marginBottom: 12,
                      alignSelf: 'center',
                    }}
                    resizeMode='cover'
                  />
                )}
                <Text style={estilos.reclamacaoDetalheTitulo}>
                  {reclamacao.titulo}
                </Text>
                <Text style={estilos.reclamacaoDetalheDescricao}>
                  {reclamacao.descricao}
                </Text>
              </View>
              <View style={estilos.respostaContainer}>
                <Text style={estilos.respostaLabel}>Sua Resposta:</Text>
                <TextInput
                  style={estilos.respostaInput}
                  multiline={true}
                  numberOfLines={5}
                  placeholder='Digite sua resposta para esta reclamação...'
                  placeholderTextColor='#999'
                  value={resposta}
                  onChangeText={setResposta}
                />
              </View>
              <View style={estilos.modalBotoes}>
                <Pressable
                  style={[estilos.modalBotao, estilos.botaoCancelar]}
                  onPress={onClose}
                >
                  <Text style={estilos.textoBotaoCancelar}>Cancelar</Text>
                </Pressable>
                <Pressable
                  style={[estilos.modalBotao, estilos.botaoEnviar]}
                  onPress={onEnviar}
                >
                  <Text style={estilos.textoBotaoEnviar}>Enviar Resposta</Text>
                </Pressable>
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
}
