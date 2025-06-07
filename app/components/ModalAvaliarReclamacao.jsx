import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
  Switch,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

/**
 * 🎨 DESIGN SYSTEM - CORES
 * Paleta Dracula harmônica e elegante
 */
const CORES = {
  fundoModal: 'rgba(0, 0, 0, 0.8)',
  fundoClaro: '#282a36',
  fundoMaisClaro: '#3a3f58',
  corPrimaria: '#44475a',
  corSecundaria: '#6272a4',
  corSucesso: '#50fa7b',
  corAlerta: '#FF9800',
  textoPrincipal: '#f8f8f2',
  textoSuave: 'rgba(255, 255, 255, 0.7)',
  estrelaAtiva: '#f1fa8c',
  estrelaInativa: '#6272a4',
};

/**
 * 🎨 ESTILOS DO COMPONENTE
 * Estilização seguindo padrões da aplicação
 */
const estilos = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: CORES.fundoModal,
  },
  modalContent: {
    backgroundColor: CORES.fundoClaro,
    margin: 20,
    borderRadius: 12,
    maxHeight: '85%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: CORES.corPrimaria,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: CORES.textoPrincipal,
  },
  modalScrollView: {
    padding: 16,
  },

  // Informações da reclamação
  reclamacaoInfo: {
    backgroundColor: CORES.fundoMaisClaro,
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: CORES.corPrimaria,
  },
  reclamacaoTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: CORES.textoPrincipal,
    marginBottom: 4,
  },
  reclamacaoEmpresa: {
    fontSize: 14,
    color: CORES.textoSuave,
  },

  // Sistema de estrelas
  avaliacaoContainer: {
    marginBottom: 24,
  },
  avaliacaoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: CORES.textoPrincipal,
    marginBottom: 12,
    textAlign: 'center',
  },
  estrelasContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  estrela: {
    marginHorizontal: 8,
    padding: 4,
  },
  avaliacaoTexto: {
    textAlign: 'center',
    fontSize: 14,
    color: CORES.textoSuave,
    marginTop: 8,
  },

  // Toggle problema resolvido
  problemaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: CORES.fundoMaisClaro,
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  problemaTexto: {
    fontSize: 16,
    color: CORES.textoPrincipal,
    fontWeight: '600',
    flex: 1,
  },
  problemaSubtexto: {
    fontSize: 12,
    color: CORES.textoSuave,
    marginTop: 2,
  },

  // Campo de comentário
  comentarioContainer: {
    marginBottom: 24,
  },
  comentarioLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: CORES.textoPrincipal,
    marginBottom: 8,
  },
  comentarioInput: {
    backgroundColor: CORES.fundoMaisClaro,
    borderRadius: 8,
    padding: 12,
    color: CORES.textoPrincipal,
    textAlignVertical: 'top',
    minHeight: 100,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  comentarioFocused: {
    borderColor: CORES.corPrimaria,
  },
  comentarioInfo: {
    fontSize: 12,
    color: CORES.textoSuave,
    marginTop: 4,
  },

  // Botões de ação
  modalBotoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  modalBotao: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoCancelar: {
    backgroundColor: CORES.corSecundaria,
    marginRight: 8,
  },
  botaoEnviar: {
    backgroundColor: CORES.corSecundaria,
    marginLeft: 8,
  },
  botaoDesabilitado: {
    backgroundColor: '#555',
    opacity: 0.6,
  },
  textoBotao: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  textoBotaoCancelar: {
    color: '#fff',
  },
  textoBotaoEnviar: {
    color: '#fff',
  },
});

/**
 * 🌟 COMPONENTE MODAL DE AVALIAÇÃO
 *
 * FUNCIONALIDADES:
 * ✅ Sistema de 5 estrelas interativo
 * ✅ Toggle para indicar se problema foi resolvido
 * ✅ Campo de comentário opcional
 * ✅ Validações em tempo real
 * ✅ Feedback visual para o usuário
 * ✅ Integração com API de avaliação
 *
 * @param {boolean} visible - Controla visibilidade do modal
 * @param {Function} onClose - Callback para fechar modal
 * @param {Object} reclamacao - Dados da reclamação a ser avaliada
 * @param {Function} onAvaliar - Callback para enviar avaliação
 */
export default function ModalAvaliarReclamacao({
  visible,
  onClose,
  reclamacao,
  onAvaliar,
}) {
  // Estados do componente
  const [estrelas, setEstrelas] = useState(0);
  const [problemaResolvido, setProblemaResolvido] = useState(null);
  const [comentario, setComentario] = useState('');
  const [comentarioFocused, setComentarioFocused] = useState(false);
  const [enviando, setEnviando] = useState(false);

  /**
   * RESET: Limpa estados quando modal abre/fecha
   * Garante que dados anteriores não permaneçam
   */
  useEffect(() => {
    if (visible) {
      // Reset states when modal opens
      setEstrelas(0);
      setProblemaResolvido(null);
      setComentario('');
      setEnviando(false);
    }
  }, [visible]);

  /**
   * LABELS DINÂMICOS: Texto baseado na quantidade de estrelas
   * Feedback imediato para o usuário
   */
  const getAvaliacaoTexto = (numEstrelas) => {
    const textos = {
      0: 'Toque nas estrelas para avaliar',
      1: 'Muito insatisfeito',
      2: 'Insatisfeito',
      3: 'Neutro',
      4: 'Satisfeito',
      5: 'Muito satisfeito',
    };
    return textos[numEstrelas] || '';
  };

  /**
   * VALIDAÇÃO: Verifica se dados são válidos para envio
   * Garante que campos obrigatórios estão preenchidos
   */
  const dadosValidos = () => {
    return estrelas >= 1 && estrelas <= 5 && problemaResolvido !== null;
  };

  /**
   * HANDLER: Envio da avaliação
   * Valida dados, chama callback e executa refresh
   */
  const handleEnviarAvaliacao = async () => {
    if (!dadosValidos()) {
      if (estrelas < 1 || estrelas > 5) {
        Alert.alert(
          'Avaliação Incompleta',
          'Por favor, selecione uma avaliação de 1 a 5 estrelas.',
          [{ text: 'OK' }]
        );
        return;
      }

      if (problemaResolvido === null) {
        Alert.alert(
          'Informação Obrigatória',
          'Por favor, informe se seu problema foi resolvido ou não.',
          [{ text: 'OK' }]
        );
        return;
      }
    }

    // Validação adicional do comentário se preenchido
    if (comentario.trim().length > 0 && comentario.trim().length < 10) {
      Alert.alert(
        'Comentário Muito Curto',
        'Se preenchido, o comentário deve ter pelo menos 10 caracteres.',
        [{ text: 'OK' }]
      );
      return;
    }

    try {
      setEnviando(true);

      /**
       * DADOS DA AVALIAÇÃO
       * Estrutura enviada para a API
       */
      const dadosAvaliacao = {
        estrelas: estrelas,
        problemaResolvido: problemaResolvido,
        comentario: comentario.trim() || undefined,
      };

      await onAvaliar(dadosAvaliacao);

      // Sucesso - modal será fechado pelo componente pai
      Alert.alert(
        'Avaliação Enviada! ⭐',
        `Sua avaliação de ${estrelas} ${
          estrelas === 1 ? 'estrela' : 'estrelas'
        } foi registrada com sucesso.`,
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert(
        'Erro ao Avaliar',
        error.message ||
          'Não foi possível enviar sua avaliação. Tente novamente.',
        [{ text: 'OK' }]
      );
    } finally {
      setEnviando(false);
    }
  };

  /**
   * RENDER: Interface do modal
   */
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType='slide'
      onRequestClose={onClose}
    >
      <View style={estilos.modalContainer}>
        <View style={estilos.modalContent}>
          {/* Header do Modal */}
          <View style={estilos.modalHeader}>
            <Text style={estilos.modalTitulo}>Avaliar Atendimento</Text>
            <Pressable
              onPress={onClose}
              disabled={enviando}
            >
              <FontAwesome
                name='close'
                size={24}
                color='#fff'
              />
            </Pressable>
          </View>

          {/* Conteúdo do Modal */}
          <ScrollView style={estilos.modalScrollView}>
            {/* Informações da Reclamação */}
            {reclamacao && (
              <View style={estilos.reclamacaoInfo}>
                <Text style={estilos.reclamacaoTitulo}>
                  {reclamacao.titulo}
                </Text>
                <Text style={estilos.reclamacaoEmpresa}>
                  Empresa: {reclamacao.empresa?.nome || 'Não informado'}
                </Text>
              </View>
            )}

            {/* Sistema de Avaliação por Estrelas */}
            <View style={estilos.avaliacaoContainer}>
              <Text style={estilos.avaliacaoLabel}>
                Como você avalia o atendimento?
              </Text>

              <View style={estilos.estrelasContainer}>
                {[1, 2, 3, 4, 5].map((numero) => (
                  <Pressable
                    key={numero}
                    style={estilos.estrela}
                    onPress={() => setEstrelas(numero)}
                    disabled={enviando}
                  >
                    <FontAwesome
                      name={numero <= estrelas ? 'star' : 'star-o'}
                      size={32}
                      color={
                        numero <= estrelas
                          ? CORES.estrelaAtiva
                          : CORES.estrelaInativa
                      }
                    />
                  </Pressable>
                ))}
              </View>

              <Text style={estilos.avaliacaoTexto}>
                {getAvaliacaoTexto(estrelas)}
              </Text>
            </View>

            {/* Toggle Problema Resolvido */}
            <View
              style={[
                estilos.problemaContainer,
                problemaResolvido === null && {
                  borderColor: CORES.corAlerta,
                  borderWidth: 1,
                },
              ]}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    estilos.problemaTexto,
                    problemaResolvido === null && { color: CORES.corAlerta },
                  ]}
                >
                  Seu problema foi resolvido? *
                </Text>
                <Text style={estilos.problemaSubtexto}>
                  {problemaResolvido === null
                    ? 'Obrigatório - Selecione uma opção'
                    : 'Essa informação ajuda outras pessoas'}
                </Text>
              </View>
              <Switch
                value={problemaResolvido === true}
                onValueChange={setProblemaResolvido}
                trackColor={{
                  false: problemaResolvido === null ? '#FF9800' : '#767577',
                  true: CORES.corSucesso,
                }}
                thumbColor={problemaResolvido === true ? '#fff' : '#f4f3f4'}
                disabled={enviando}
              />
            </View>

            {/* Campo de Comentário Opcional */}
            <View style={estilos.comentarioContainer}>
              <Text style={estilos.comentarioLabel}>Comentário (opcional)</Text>
              <TextInput
                style={[
                  estilos.comentarioInput,
                  comentarioFocused && estilos.comentarioFocused,
                ]}
                multiline={true}
                numberOfLines={4}
                placeholder='Conte mais detalhes sobre sua experiência...'
                placeholderTextColor={CORES.textoSuave}
                value={comentario}
                onChangeText={setComentario}
                onFocus={() => setComentarioFocused(true)}
                onBlur={() => setComentarioFocused(false)}
                maxLength={500}
                editable={!enviando}
              />
              <Text style={estilos.comentarioInfo}>
                {comentario.length}/500 caracteres
                {comentario.trim().length > 0 && comentario.trim().length < 10
                  ? ' • Mínimo 10 caracteres'
                  : ''}
              </Text>
            </View>

            {/* Botões de Ação */}
            <View style={estilos.modalBotoes}>
              <Pressable
                style={[estilos.modalBotao, estilos.botaoCancelar]}
                onPress={onClose}
                disabled={enviando}
              >
                <Text style={[estilos.textoBotao, estilos.textoBotaoCancelar]}>
                  Cancelar
                </Text>
              </Pressable>

              <Pressable
                style={[
                  estilos.modalBotao,
                  estilos.botaoEnviar,
                  (!dadosValidos() || enviando) && estilos.botaoDesabilitado,
                ]}
                onPress={handleEnviarAvaliacao}
                disabled={!dadosValidos() || enviando}
              >
                <Text style={[estilos.textoBotao, estilos.textoBotaoEnviar]}>
                  {enviando ? 'Enviando...' : 'Enviar Avaliação'}
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
