import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useImagePicker } from '../hooks/useImagePicker';
import CustomButton from './CustomButton';

/**
 * ModalCriarReclamacao
 * Componente reutilizável para criar reclamação para uma empresa
 * Props:
 *  - visible: boolean (se o modal está aberto)
 *  - empresa: objeto (dados da empresa selecionada)
 *  - onClose: função (para fechar o modal)
 *  - onSubmit: função async (dados, imagemUri) => {} (para enviar a reclamação)
 */
export default function ModalCriarReclamacao({
  visible,
  empresa,
  onClose,
  onSubmit,
}) {
  // Estados do formulário
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [sucessoEnvio, setSucessoEnvio] = useState(false);

  // Hook para seleção de imagem
  const { imagem, setImagem, selecionarImagem } = useImagePicker();

  // Limpa o formulário ao fechar
  const limparFormulario = () => {
    setTitulo('');
    setDescricao('');
    setImagem(null);
    setSucessoEnvio(false);
  };

  // Handler de envio
  const handleEnviar = async () => {
    if (!titulo.trim() || !descricao.trim()) {
      Alert.alert('Campos obrigatórios', 'Preencha todos os campos.');
      return;
    }
    try {
      setEnviando(true);
      await onSubmit({ titulo, descricao, empresaId: empresa?.id }, imagem);
      setSucessoEnvio(true);
      setTimeout(() => {
        limparFormulario();
        onClose();
      }, 1800);
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível enviar sua reclamação.');
    } finally {
      setEnviando(false);
    }
  };

  // Fecha o modal e limpa
  const handleClose = () => {
    limparFormulario();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType='slide'
      transparent={true}
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.7)',
        }}
      >
        <View
          style={{
            backgroundColor: '#232326',
            borderRadius: 18,
            padding: 20,
            width: '90%',
            maxWidth: 400,
            maxHeight: 500,
          }}
        >
          {/* Dados da empresa */}
          {empresa && (
            <View style={{ alignItems: 'center', marginBottom: 18 }}>
              <Image
                source={{ uri: empresa.imagem }}
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                  marginBottom: 8,
                  backgroundColor: '#2A2A2D',
                }}
              />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#ECDCBF',
                  marginBottom: 2,
                }}
              >
                Nova Reclamação para {empresa.nome}
              </Text>
              <Text
                style={{
                  color: '#bbb',
                  fontSize: 13,
                  marginTop: 2,
                  textAlign: 'center',
                }}
              >
                Breve descrição lorem ipsum dolor sit amet.
              </Text>
            </View>
          )}
          {/* Formulário de reclamação */}
          {sucessoEnvio ? (
            <View style={{ alignItems: 'center', marginVertical: 30 }}>
              <FontAwesome
                name='check-circle'
                size={60}
                color='#27ae60'
              />
              <Text style={{ color: '#27ae60', fontSize: 18, marginTop: 10 }}>
                Reclamação enviada com sucesso!
              </Text>
            </View>
          ) : (
            <ScrollView style={{ maxHeight: 430 }}>
              <View style={{ marginBottom: 12 }}>
                <Text
                  style={{
                    color: '#ECDCBF',
                    fontWeight: 'bold',
                    marginBottom: 4,
                  }}
                >
                  Título *
                </Text>
                <TextInput
                  style={{
                    backgroundColor: '#2A2A2D',
                    color: '#fff',
                    borderRadius: 8,
                    padding: 8,
                    marginBottom: 8,
                  }}
                  placeholder='Ex: Atendimento ruim'
                  placeholderTextColor='#666'
                  value={titulo}
                  onChangeText={setTitulo}
                />
              </View>
              <View style={{ marginBottom: 12 }}>
                <Text
                  style={{
                    color: '#ECDCBF',
                    fontWeight: 'bold',
                    marginBottom: 4,
                  }}
                >
                  Descrição *
                </Text>
                <TextInput
                  style={{
                    backgroundColor: '#2A2A2D',
                    color: '#fff',
                    borderRadius: 8,
                    padding: 8,
                    minHeight: 60,
                    textAlignVertical: 'top',
                  }}
                  placeholder='Descreva o ocorrido...'
                  placeholderTextColor='#666'
                  value={descricao}
                  onChangeText={setDescricao}
                  multiline
                />
              </View>
              {/* Campo de upload de imagem opcional */}
              <View style={{ marginBottom: 12 }}>
                <Text
                  style={{
                    color: '#ECDCBF',
                    fontWeight: 'bold',
                    marginBottom: 4,
                  }}
                >
                  Imagem (opcional)
                </Text>
                {imagem ? (
                  <View style={{ alignItems: 'center', marginBottom: 8 }}>
                    <Image
                      source={{ uri: imagem }}
                      style={{
                        width: 90,
                        height: 90,
                        borderRadius: 10,
                        marginBottom: 6,
                      }}
                    />
                    <CustomButton
                      title='Remover imagem'
                      onPress={() => setImagem(null)}
                    />
                  </View>
                ) : (
                  <CustomButton
                    title='Selecionar imagem'
                    onPress={selecionarImagem}
                  />
                )}
              </View>
              <CustomButton
                title='Enviar Reclamação'
                onPress={handleEnviar}
                disabled={enviando}
              />
              <CustomButton
                title='Cancelar'
                onPress={handleClose}
                disabled={enviando}
              />
            </ScrollView>
          )}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
