import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

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
  const [imagemReclamacao, setImagemReclamacao] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [sucessoEnvio, setSucessoEnvio] = useState(false);

  // Selecionar imagem da galeria (atualizado para 2025)
  const selecionarImagem = async () => {
    try {
      // Não é mais necessário pedir permissão manualmente para abrir a galeria
      const resultado = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (
        !resultado.canceled &&
        resultado.assets &&
        resultado.assets.length > 0
      ) {
        setImagemReclamacao(resultado.assets[0].uri);
      }
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível selecionar a imagem.');
    }
  };

  // Limpa o formulário ao fechar
  const limparFormulario = () => {
    setTitulo('');
    setDescricao('');
    setImagemReclamacao(null);
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
      await onSubmit(
        { titulo, descricao, empresaId: empresa?.id },
        imagemReclamacao
      );
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
                {imagemReclamacao ? (
                  <View style={{ alignItems: 'center', marginBottom: 8 }}>
                    <Image
                      source={{ uri: imagemReclamacao }}
                      style={{
                        width: 90,
                        height: 90,
                        borderRadius: 10,
                        marginBottom: 6,
                      }}
                    />
                    <Pressable
                      style={{
                        backgroundColor: '#D84040',
                        borderRadius: 6,
                        paddingVertical: 4,
                        paddingHorizontal: 12,
                      }}
                      onPress={() => setImagemReclamacao(null)}
                    >
                      <Text style={{ color: '#fff', fontSize: 14 }}>
                        Remover imagem
                      </Text>
                    </Pressable>
                  </View>
                ) : (
                  <Pressable
                    style={{
                      backgroundColor: '#D84040',
                      borderRadius: 8,
                      padding: 10,
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}
                    onPress={selecionarImagem}
                  >
                    <FontAwesome
                      name='camera'
                      size={18}
                      color='#fff'
                      style={{ marginRight: 8 }}
                    />
                    <Text
                      style={{
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: 15,
                      }}
                    >
                      Selecionar imagem
                    </Text>
                  </Pressable>
                )}
              </View>
              <Pressable
                style={{
                  backgroundColor: '#D84040',
                  borderRadius: 8,
                  padding: 12,
                  alignItems: 'center',
                  marginTop: 8,
                  opacity: enviando ? 0.7 : 1,
                }}
                onPress={handleEnviar}
                disabled={enviando}
              >
                <Text
                  style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}
                >
                  Enviar Reclamação
                </Text>
              </Pressable>
              <Pressable
                style={{ marginTop: 10, alignItems: 'center' }}
                onPress={handleClose}
              >
                <Text style={{ color: '#bbb', fontSize: 15 }}>Cancelar</Text>
              </Pressable>
            </ScrollView>
          )}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
