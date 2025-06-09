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
  Pressable,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { useImagePicker } from '../src/hooks/useImagePicker';
import CustomButton from './CustomButton';
import { useFeedback } from '../src/hooks/useFeedback';

// PALETA DRACULA PARA MODAL CRIAR RECLAMAÇÃO
const CORES = {
  // Fundos
  fundoModal: 'rgba(0, 0, 0, 0.8)',
  fundoPrincipal: '#282a36', // Dracula background
  fundoInput: '#44475a', // Dracula current line
  fundoImagem: '#B6B09F',

  // Textos
  textoPrincipal: '#f8f8f2', // Dracula foreground
  textoSecundario: '#6272a4', // Dracula comment
  textoSuave: 'rgba(255, 255, 255, 0.7)',
  placeholder: '#6272a4', // Dracula comment

  // Cores de ação
  sucesso: '#50fa7b', // Dracula green
  erro: '#ff5555', // Dracula red
  alerta: '#ffb86c', // Dracula orange
  primaria: '#8be9fd', // Dracula cyan
  secundaria: '#bd93f9', // Dracula purple

  // Botões
  botaoEnviar: '#50fa7b', // Verde para ação principal
  botaoCancelar: '#6272a4', // Cinza para cancelar
  botaoRemover: '#ff5555', // Vermelho para remover
  botaoImagem: '#bd93f9', // Purple para imagem
};

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

  /**
   * Estado para campo de contato (email ou WhatsApp)
   * Implementa comunicação direta entre cliente e empresa
   */
  const [contato, setContato] = useState('');

  const [enviando, setEnviando] = useState(false);
  const [sucessoEnvio, setSucessoEnvio] = useState(false);

  // Hook para seleção de imagem
  const { imagem, setImagem, selecionarImagem } = useImagePicker();

  // Hook para feedbacks
  const feedback = useFeedback();

  /**
   * Função de limpeza do formulário
   * Reseta todos os estados para valores iniciais
   */
  const limparFormulario = () => {
    setTitulo('');
    setDescricao('');
    setContato(''); // Reset do campo contato
    setImagem(null);
    setSucessoEnvio(false);
  };

  /**
   * Validação específica do campo contato
   * Implementa regras de negócio no lado cliente
   */
  const validarContato = (valor) => {
    if (!valor || !valor.trim()) {
      return 'Contato é obrigatório. Digite seu email ou WhatsApp.';
    }

    const contatoTrimmed = valor.trim();

    // Validação de comprimento mínimo
    if (contatoTrimmed.length < 5) {
      return 'Contato deve ter pelo menos 5 caracteres.';
    }

    // Regex para validação de email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Regex para validação de WhatsApp (flexível para diferentes formatos)
    const whatsappRegex =
      /^(?:\+?55\s?)?(?:\(?\d{2}\)?[\s-]?)(?:9\d{4}[\s-]?\d{4}|\d{4}[\s-]?\d{4})$/;

    const isValidEmail = emailRegex.test(contatoTrimmed);
    const isValidWhatsApp = whatsappRegex.test(contatoTrimmed);

    if (!isValidEmail && !isValidWhatsApp) {
      return 'Digite um email válido ou WhatsApp no formato (11)99999-9999';
    }

    return null; // Válido
  };

  // Handler de envio
  const handleEnviar = async () => {
    // Validação dos campos obrigatórios
    if (!titulo.trim() || !descricao.trim() || !contato.trim()) {
      feedback.showError('Preencha todos os campos obrigatórios.');
      return;
    }

    if (titulo.trim().length < 5 || descricao.trim().length < 5) {
      feedback.showError('Título e descrição devem ter no mínimo 5 letras.');
      return;
    }

    /**
     * Validação obrigatória do campo contato
     * Aplica validação client-side antes do envio
     */
    const erroContato = validarContato(contato);
    if (erroContato) {
      feedback.showError(erroContato);
      return;
    }

    // Impede reclamação duplicada consecutiva
    const ultimaReclamacao = global.ultimaReclamacao || {};
    if (
      ultimaReclamacao.empresaId === empresa?.id &&
      ultimaReclamacao.titulo === titulo.trim() &&
      ultimaReclamacao.descricao === descricao.trim()
    ) {
      feedback.showError(
        'Você não pode reclamar da mesma empresa duas vezes seguidas com o mesmo conteúdo.'
      );
      return;
    }

    try {
      feedback.setLoading(true);

      /**
       * Envio dos dados incluindo o campo contato obrigatório
       * Mantém compatibilidade com API existente
       */
      await onSubmit(
        {
          titulo,
          descricao,
          contato: contato.trim(), // Agora é obrigatório
          empresaId: empresa?.id,
        },
        imagem
      );

      // Não mostra mais alert - tela visual de sucesso é suficiente
      // feedback.showSuccess('Reclamação enviada com sucesso!'); // REMOVIDO

      // Salva última reclamação globalmente para evitar duplicidade consecutiva
      global.ultimaReclamacao = {
        empresaId: empresa?.id,
        titulo: titulo.trim(),
        descricao: descricao.trim(),
      };

      setSucessoEnvio(true);
      setTimeout(() => {
        limparFormulario();
        onClose();
        feedback.resetFeedback();
      }, 5800); // Aumentado de 1800ms para 5800ms (mais 4 segundos)
    } catch (e) {
      feedback.showError('Não foi possível enviar sua reclamação.');
    } finally {
      feedback.setLoading(false);
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
          backgroundColor: CORES.fundoModal,
        }}
      >
        <View
          style={{
            backgroundColor: CORES.fundoPrincipal,
            borderRadius: 18,
            padding: 20,
            width: '90%',
            maxWidth: 400,
            maxHeight: '85%',
            minHeight: 600,
          }}
        >
          {/* Feedback visual - apenas erros são mostrados */}
          {feedback.error && (
            <Text
              style={{
                color: CORES.erro,
                textAlign: 'center',
                marginBottom: 8,
              }}
            >
              {feedback.error}
            </Text>
          )}
          {/* Removido feedback.success - tela visual é melhor */}
          {/* Dados da empresa */}
          {empresa && !sucessoEnvio && (
            <View style={{ alignItems: 'center', marginBottom: 18 }}>
              <Image
                source={
                  typeof empresa.imagem === 'string'
                    ? { uri: empresa.imagem }
                    : empresa.imagem
                }
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                  marginBottom: 8,
                  backgroundColor: CORES.fundoImagem,
                }}
              />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: CORES.textoPrincipal,
                  marginBottom: 2,
                }}
              >
                Nova Reclamação para {empresa.nome}
              </Text>
              <Text
                style={{
                  color: CORES.textoSecundario,
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
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 40,
                paddingHorizontal: 20,
                minHeight: 280,
                position: 'relative',
              }}
            >
              {/* Botão X para fechar */}
              <Pressable
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: 20,
                  padding: 8,
                  zIndex: 1,
                }}
                onPress={handleClose}
              >
                <FontAwesome
                  name='times'
                  size={20}
                  color={CORES.textoSecundario}
                />
              </Pressable>

              {/* Ícone de sucesso simplificado */}
              <View
                style={{
                  backgroundColor: 'rgba(39, 174, 96, 0.15)',
                  borderRadius: 40,
                  padding: 20,
                  marginBottom: 25,
                  borderWidth: 3,
                  borderColor: CORES.sucesso,
                }}
              >
                <FontAwesome
                  name='check-circle'
                  size={70}
                  color={CORES.sucesso}
                />
              </View>

              {/* Título principal */}
              <Text
                style={{
                  color: CORES.sucesso,
                  fontSize: 24,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginBottom: 15,
                  letterSpacing: 0.5,
                }}
              >
                Reclamação Enviada!
              </Text>

              {/* Mensagem informativa simplificada */}
              <Text
                style={{
                  color: CORES.textoPrincipal,
                  fontSize: 16,
                  textAlign: 'center',
                  lineHeight: 24,
                  marginBottom: 20,
                }}
              >
                A empresa será notificada e você receberá uma resposta em breve.
              </Text>

              {/* LottieView animação */}
              <LottieView
                source={require('../imgs/header.json')}
                autoPlay
                loop
                style={{
                  width: 200,
                  height: 240,
                }}
              />
            </View>
          ) : (
            <ScrollView style={{ maxHeight: 430 }}>
              <View style={{ marginBottom: 12 }}>
                <Text
                  style={{
                    color: CORES.textoPrincipal,
                    fontWeight: 'bold',
                    marginBottom: 4,
                  }}
                >
                  Título *
                </Text>
                <TextInput
                  style={{
                    backgroundColor: CORES.fundoInput,
                    color: CORES.textoPrincipal,
                    borderRadius: 8,
                    padding: 8,
                    marginBottom: 8,
                  }}
                  placeholder='Ex: Atendimento ruim'
                  placeholderTextColor={CORES.placeholder}
                  value={titulo}
                  onChangeText={setTitulo}
                />
              </View>
              <View style={{ marginBottom: 12 }}>
                <Text
                  style={{
                    color: CORES.textoPrincipal,
                    fontWeight: 'bold',
                    marginBottom: 4,
                  }}
                >
                  Descrição *
                </Text>
                <TextInput
                  style={{
                    backgroundColor: CORES.fundoInput,
                    color: CORES.textoPrincipal,
                    borderRadius: 8,
                    padding: 8,
                    minHeight: 60,
                    textAlignVertical: 'top',
                  }}
                  placeholder='Descreva o ocorrido...'
                  placeholderTextColor={CORES.placeholder}
                  value={descricao}
                  onChangeText={setDescricao}
                  multiline
                />
              </View>
              {/* Campo de contato obrigatório */}
              <View style={{ marginBottom: 12 }}>
                <Text
                  style={{
                    color: CORES.textoPrincipal,
                    fontWeight: 'bold',
                    marginBottom: 4,
                  }}
                >
                  Contato para Resposta *
                </Text>
                <TextInput
                  style={{
                    backgroundColor: CORES.fundoInput,
                    color: CORES.textoPrincipal,
                    borderRadius: 8,
                    padding: 8,
                    marginBottom: 8,
                  }}
                  placeholder='Email ou WhatsApp: exemplo@email.com ou (11)99999-9999'
                  placeholderTextColor={CORES.placeholder}
                  value={contato}
                  onChangeText={setContato}
                  keyboardType='email-address'
                />
                <Text
                  style={{
                    color: CORES.textoSecundario,
                    fontSize: 12,
                    marginTop: -4,
                    marginBottom: 8,
                  }}
                >
                  💬 A empresa usará este contato para responder sua reclamação
                </Text>
              </View>
              {/* Campo de upload de imagem opcional */}
              <View style={{ marginBottom: 12 }}>
                <Text
                  style={{
                    color: CORES.textoPrincipal,
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
                      height={40}
                      width={140}
                      cor={CORES.botaoRemover}
                    />
                  </View>
                ) : (
                  <CustomButton
                    title='Imagem'
                    onPress={selecionarImagem}
                    height={48}
                    width='37%'
                    cor={CORES.botaoImagem}
                  />
                )}
              </View>
              <CustomButton
                title='Enviar Reclamação'
                onPress={handleEnviar}
                disabled={enviando}
                height={48}
                width='70%'
                cor={CORES.botaoEnviar}
              />
              <CustomButton
                title='Cancelar'
                onPress={handleClose}
                disabled={enviando}
                height={48}
                width='70%'
                cor={CORES.botaoCancelar}
              />
            </ScrollView>
          )}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
