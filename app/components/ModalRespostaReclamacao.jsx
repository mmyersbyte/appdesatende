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
  fundoModal: 'rgba(0, 0, 0, 0.8)',
  fundoClaro: '#282a36',
  fundoMaisClaro: '#3a3f58',
  corPrimaria: '#44475a',
  corSecundaria: '#6272a4',
  textoPrincipal: '#f8f8f2',
  textoSuave: 'rgba(255, 255, 255, 0.7)',
  placeholder: '#8be9fd',
};

const estilos = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: CORES.fundoModal,
    paddingHorizontal: 15,
  },
  modalContent: {
    backgroundColor: CORES.fundoClaro,
    borderRadius: 15,
    maxHeight: '88%',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    backgroundColor: CORES.corPrimaria,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  modalTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  modalScrollView: {
    padding: 18,
  },
  reclamacaoDetalhes: {
    marginBottom: 22,
    backgroundColor: CORES.fundoMaisClaro,
    padding: 16,
    borderRadius: 12,
  },
  reclamacaoDetalheUsuario: {
    fontSize: 16,
    fontWeight: 'bold',
    color: CORES.textoPrincipal,
    marginBottom: 2,
  },
  reclamacaoDetalheData: {
    fontSize: 13,
    color: CORES.textoSuave,
    marginBottom: 12,
  },
  reclamacaoDetalheTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: CORES.textoPrincipal,
    marginBottom: 8,
    lineHeight: 26,
  },
  reclamacaoDetalheDescricao: {
    fontSize: 15,
    color: CORES.textoPrincipal,
    lineHeight: 22,
  },
  respostaContainer: {
    marginBottom: 22,
  },
  respostaLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: CORES.textoPrincipal,
    marginBottom: 12,
  },
  respostaInput: {
    backgroundColor: CORES.fundoMaisClaro,
    borderRadius: 12,
    padding: 16,
    color: CORES.textoPrincipal,
    textAlignVertical: 'top',
    minHeight: 140,
    fontSize: 16,
    lineHeight: 22,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  respostaInputFocused: {
    borderColor: CORES.placeholder,
  },
  modalBotoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 8,
    marginBottom: 8,
  },
  modalBotao: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
  },
  botaoCancelar: {
    backgroundColor: CORES.corSecundaria,
  },
  botaoEnviar: {
    backgroundColor: CORES.corSecundaria,
  },
  textoBotaoCancelar: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  textoBotaoEnviar: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  /**
   * Estilos para exibição de contato do cliente
   * Segue padrão visual do design system
   */
  contatoContainer: {
    backgroundColor: CORES.fundoMaisClaro,
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: CORES.placeholder,
  },
  contatoLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: CORES.placeholder,
    marginBottom: 6,
  },
  contatoValor: {
    fontSize: 17,
    color: CORES.textoPrincipal,
    fontWeight: '600',
    marginBottom: 4,
  },
  contatoDica: {
    fontSize: 13,
    color: CORES.textoSuave,
    fontStyle: 'italic',
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
                  Cliente: {reclamacao.user?.nome || 'Nome não informado'}
                </Text>
                <Text style={estilos.reclamacaoDetalheData}>
                  Data:{' '}
                  {reclamacao.createdAt
                    ? new Date(reclamacao.createdAt).toLocaleDateString(
                        'pt-BR',
                        {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                        }
                      )
                    : 'Data não informada'}
                </Text>

                {/**
                 * Exibição do contato do cliente
                 * Permite comunicação direta empresa-cliente
                 */}
                {reclamacao.contato && (
                  <View style={estilos.contatoContainer}>
                    <Text style={estilos.contatoLabel}>
                      Contato do Cliente:
                    </Text>
                    <Text style={estilos.contatoValor}>
                      {reclamacao.contato}
                    </Text>
                    <Text style={estilos.contatoDica}>
                      Use este contato para comunicação direta
                    </Text>
                  </View>
                )}

                {/**
                 * Exibição da imagem da reclamação
                 * Renderizada em base64 conforme enviado pelo backend
                 */}
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

                {/**
                 * Título e descrição da reclamação
                 * Dados principais do problema relatado
                 */}
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
                  placeholderTextColor={CORES.placeholder}
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
