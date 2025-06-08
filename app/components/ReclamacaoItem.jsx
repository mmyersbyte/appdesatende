import React, { useState } from 'react';
import { View, Text, Image, Pressable, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import ModalAvaliarReclamacao from './ModalAvaliarReclamacao';
import { avaliarReclamacao, deletarReclamacao } from '../api/reclamacao';

export default function ReclamacaoItem({ item, onAtualizarReclamacoes }) {
  // Estado para controlar o modal de avaliação
  const [modalAvaliacaoVisivel, setModalAvaliacaoVisivel] = useState(false);

  /**
   * 🌟 HANDLER: Enviar avaliação
   * Integra com API e atualiza lista de reclamações
   */
  const handleAvaliar = async (dadosAvaliacao) => {
    try {
      await avaliarReclamacao(item._id, dadosAvaliacao);

      // Atualiza lista de reclamações se callback foi fornecido
      if (onAtualizarReclamacoes) {
        await onAtualizarReclamacoes();
      }

      // Fecha modal
      setModalAvaliacaoVisivel(false);
    } catch (error) {
      console.error('Erro ao avaliar reclamação:', error);
      throw error; // Propaga erro para o modal tratar
    }
  };

  /**
   * 🗑️ HANDLER: Deletar reclamação
   * Confirma e remove reclamação permanentemente
   */
  const handleDeletarReclamacao = () => {
    Alert.alert(
      'Excluir Reclamação',
      `Tem certeza que deseja excluir permanentemente a reclamação "${item.titulo}"?\n\nEsta ação não pode ser desfeita.`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await deletarReclamacao(item._id);

              // Atualiza lista de reclamações se callback foi fornecido
              if (onAtualizarReclamacoes) {
                await onAtualizarReclamacoes();
              }

              Alert.alert('Sucesso', 'Reclamação excluída com sucesso!');
            } catch (error) {
              Alert.alert(
                'Erro',
                error.message || 'Erro ao excluir reclamação'
              );
            }
          },
        },
      ]
    );
  };

  /**
   * 🎨 CONFIGURAÇÃO VISUAL POR ESTRELAS
   * Define cores, ícones e textos baseados na avaliação
   */
  const getAvaliacaoVisual = (estrelas) => {
    const configuracoes = {
      1: {
        cor: '#FF4444',
        corFundo: 'rgba(255, 68, 68, 0.15)',
        corBorda: '#FF4444',
        icone: 'frown-o',
        iconeSecundario: 'thumbs-down',
        texto: 'Muito Insatisfeito',
      },
      2: {
        cor: '#FF9500',
        corFundo: 'rgba(255, 149, 0, 0.15)',
        corBorda: '#FF9500',
        icone: 'meh-o',
        iconeSecundario: 'hand-o-down',
        texto: 'Insatisfeito',
      },
      3: {
        cor: '#FFD700',
        corFundo: 'rgba(255, 215, 0, 0.15)',
        corBorda: '#FFD700',
        icone: 'smile-o',
        iconeSecundario: 'minus-circle',
        texto: 'Neutro',
      },
      4: {
        cor: '#4CAF50',
        corFundo: 'rgba(76, 175, 80, 0.15)',
        corBorda: '#4CAF50',
        icone: 'smile-o',
        iconeSecundario: 'thumbs-up',
        texto: 'Satisfeito',
      },
      5: {
        cor: '#2E7D32',
        corFundo: 'rgba(46, 125, 50, 0.15)',
        corBorda: '#2E7D32',
        icone: 'heart',
        iconeSecundario: 'heart',
        texto: 'Muito Satisfeito',
      },
    };
    return configuracoes[estrelas] || configuracoes[3];
  };

  /**
   * 🎨 COMPONENTE: Exibição da avaliação existente MELHORADA
   * Mostra estado visual padronizado baseado nas estrelas
   */
  const renderAvaliacaoExistente = () => {
    if (!item.avaliacao || !item.avaliacao.estrelas) return null;

    const { estrelas, problemaResolvido, comentario, dataAvaliacao } =
      item.avaliacao;

    const visual = getAvaliacaoVisual(estrelas);

    return (
      <View
        style={{
          backgroundColor: visual.corFundo,
          borderRadius: 12,
          padding: 14,
          marginTop: 14,
          borderWidth: 2,
          borderColor: visual.corBorda,
          position: 'relative',
        }}
      >
        {/* Badge de status "AVALIADO" */}
        <View
          style={{
            position: 'absolute',
            top: -8,
            left: 12,
            backgroundColor: visual.cor,
            paddingHorizontal: 12,
            paddingVertical: 4,
            borderRadius: 12,
            elevation: 2,
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowRadius: 2,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <FontAwesome
            name='check'
            size={10}
            color='#fff'
            style={{ marginRight: 4 }}
          />
          <Text
            style={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 11,
              letterSpacing: 0.5,
            }}
          >
            AVALIADO
          </Text>
        </View>

        {/* Header da avaliação */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
            marginTop: 8,
          }}
        >
          <FontAwesome
            name={visual.icone}
            size={20}
            color={visual.cor}
            style={{ marginRight: 8 }}
          />
          <Text
            style={{
              color: visual.cor,
              fontWeight: 'bold',
              fontSize: 16,
              flex: 1,
            }}
          >
            {visual.texto}
          </Text>
          <FontAwesome
            name={visual.iconeSecundario}
            size={18}
            color={visual.cor}
            style={{ marginLeft: 8 }}
          />
        </View>

        {/* Estrelas com destaque */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
            backgroundColor: 'rgba(0,0,0,0.1)',
            padding: 8,
            borderRadius: 8,
          }}
        >
          {[1, 2, 3, 4, 5].map((numero) => (
            <FontAwesome
              key={numero}
              name={numero <= estrelas ? 'star' : 'star-o'}
              size={18}
              color={numero <= estrelas ? '#FFD700' : '#666'}
              style={{ marginRight: 3 }}
            />
          ))}
          <Text
            style={{
              color: '#fff',
              marginLeft: 10,
              fontSize: 14,
              fontWeight: 'bold',
            }}
          >
            {estrelas}/5 estrelas
          </Text>
        </View>

        {/* Status do problema com ícone melhorado */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 8,
            backgroundColor: problemaResolvido
              ? 'rgba(76, 175, 80, 0.2)'
              : 'rgba(255, 107, 107, 0.2)',
            padding: 8,
            borderRadius: 6,
          }}
        >
          <FontAwesome
            name={problemaResolvido ? 'check-circle' : 'times-circle'}
            size={16}
            color={problemaResolvido ? '#4CAF50' : '#ff6b6b'}
            style={{ marginRight: 8 }}
          />
          <Text
            style={{
              color: problemaResolvido ? '#4CAF50' : '#ff6b6b',
              fontSize: 14,
              fontWeight: '600',
            }}
          >
            Problema {problemaResolvido ? 'RESOLVIDO ✓' : 'NÃO RESOLVIDO ✗'}
          </Text>
        </View>

        {/* Comentário com destaque */}
        {comentario && (
          <View
            style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              padding: 10,
              borderRadius: 8,
              borderLeftWidth: 3,
              borderLeftColor: visual.cor,
              marginBottom: 8,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginBottom: 4,
              }}
            >
              <FontAwesome
                name='quote-left'
                size={12}
                color={visual.cor}
                style={{ marginRight: 8, marginTop: 2 }}
              />
              <Text
                style={{
                  color: '#fff',
                  fontSize: 14,
                  fontStyle: 'italic',
                  lineHeight: 20,
                  flex: 1,
                }}
              >
                {comentario}
              </Text>
            </View>
          </View>
        )}

        {/* Data da avaliação com ícone */}
        {dataAvaliacao && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 4,
            }}
          >
            <FontAwesome
              name='clock-o'
              size={12}
              color='#888'
              style={{ marginRight: 6 }}
            />
            <Text style={{ color: '#888', fontSize: 11 }}>
              Avaliado em: {new Date(dataAvaliacao).toLocaleString('pt-BR')}
            </Text>
          </View>
        )}

        {/* Indicador de reclamação finalizada */}
        {item.status === 'fechada' && (
          <View
            style={{
              position: 'absolute',
              top: -8,
              right: 12,
              backgroundColor: '#4CAF50',
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 12,
              elevation: 2,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <FontAwesome
              name='flag-checkered'
              size={10}
              color='#fff'
              style={{ marginRight: 4 }}
            />
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 10,
                letterSpacing: 0.5,
              }}
            >
              FINALIZADA
            </Text>
          </View>
        )}
      </View>
    );
  };

  /**
   * 🎨 COMPONENTE: Botão de avaliação
   * Aparece apenas para reclamações respondidas que ainda não foram avaliadas
   */
  const renderBotaoAvaliacao = () => {
    // Só mostra se tem resposta e não foi avaliada ainda
    const temResposta = item.resposta && item.resposta.texto;
    const jaAvaliada = item.avaliacao && item.avaliacao.estrelas;

    if (!temResposta || jaAvaliada) return null;

    return (
      <Pressable
        style={{
          backgroundColor: 'rgba(255, 211, 105, 0.2)',
          borderRadius: 8,
          paddingVertical: 12,
          paddingHorizontal: 14,
          marginTop: 12,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: '#FFD369',
          elevation: 1,
        }}
        onPress={() => setModalAvaliacaoVisivel(true)}
        android_ripple={{ color: 'rgba(255, 211, 105, 0.1)' }}
      >
        <FontAwesome
          name='star-o'
          size={18}
          color='#FFD369'
          style={{ marginRight: 10 }}
        />
        <Text style={{ color: '#FFD369', fontWeight: 'bold', fontSize: 15 }}>
          Avaliar Atendimento
        </Text>
      </Pressable>
    );
  };

  return (
    <>
      <View
        style={{
          backgroundColor: '#26262a',
          borderRadius: 18,
          padding: 16,
          marginBottom: 22,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 4,
          borderWidth: 0,
        }}
      >
        {/* Imagem */}
        {item.imagem && item.imagem.data && (
          <Image
            source={{
              uri: `data:${item.imagem.contentType};base64,${item.imagem.data}`,
            }}
            style={{
              width: '100%',
              height: 140,
              borderRadius: 12,
              marginBottom: 12,
              backgroundColor: '#1A1A1D',
            }}
            resizeMode='cover'
          />
        )}

        {/* Título */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 4,
          }}
        >
          <Text
            style={{
              fontWeight: 'bold',
              color: '#FFD369',
              fontSize: 20,
              letterSpacing: 0.2,
              flex: 1,
              marginRight: 10,
            }}
          >
            {item.titulo}
          </Text>

          {/* Ícone de lixeira */}
          <Pressable
            style={{
              backgroundColor: 'rgba(255, 85, 85, 0.15)',
              borderRadius: 12,
              padding: 8,
              borderWidth: 1,
              borderColor: 'rgba(255, 85, 85, 0.3)',
              shadowColor: '#ff5555',
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 2,
            }}
            onPress={handleDeletarReclamacao}
            android_ripple={{ color: 'rgba(255, 85, 85, 0.2)' }}
          >
            <FontAwesome
              name='trash-o'
              size={16}
              color='#ff5555'
            />
          </Pressable>
        </View>

        {/* Descrição */}
        <Text
          style={{
            color: '#fff',
            fontSize: 15,
            marginBottom: 10,
            lineHeight: 21,
          }}
        >
          {item.descricao}
        </Text>

        {/* Empresa e Data */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 2,
            gap: 10,
          }}
        >
          <FontAwesome
            name='building'
            size={14}
            color='#4ecdc4'
          />
          <Text style={{ color: '#bbb', fontSize: 14, marginRight: 10 }}>
            {item.empresa?.nome || 'N/A'}
          </Text>
          <FontAwesome
            name='calendar'
            size={13}
            color='#888'
          />
          <Text style={{ color: '#888', fontSize: 12 }}>
            {new Date(item.createdAt).toLocaleDateString()}{' '}
            {new Date(item.createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>

        {/* Status da reclamação */}
        {(!item.resposta || !item.resposta.texto) &&
          item.status === 'aberta' && (
            <View
              style={{
                backgroundColor: 'rgba(216,64,64,0.10)',
                borderRadius: 8,
                paddingVertical: 6,
                paddingHorizontal: 12,
                alignSelf: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 8,
                marginTop: 2,
              }}
            >
              <FontAwesome
                name='exclamation-circle'
                size={16}
                color='#D84040'
                style={{ marginRight: 6 }}
              />
              <Text
                style={{ color: '#D84040', fontWeight: 'bold', fontSize: 14 }}
              >
                Não respondida
              </Text>
            </View>
          )}

        {/* Resposta da empresa */}
        {item.resposta && item.resposta.texto && (
          <View
            style={{
              backgroundColor: 'rgba(76, 205, 196, 0.10)',
              borderRadius: 10,
              padding: 12,
              marginTop: 14,
              borderLeftWidth: 4,
              borderLeftColor: '#4ecdc4',
              flexDirection: 'row',
              alignItems: 'flex-start',
              gap: 8,
            }}
          >
            <FontAwesome
              name='reply'
              size={18}
              color='#4ecdc4'
              style={{ marginTop: 2 }}
            />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: '#4ecdc4',
                  fontWeight: 'bold',
                  marginBottom: 2,
                }}
              >
                Resposta da empresa:
              </Text>
              <Text style={{ color: '#fff', fontSize: 15 }}>
                {item.resposta.texto}
              </Text>
              {item.resposta.respondidoPor && (
                <Text style={{ color: '#bbb', fontSize: 12, marginTop: 4 }}>
                  Respondido por:{' '}
                  {item.resposta.respondidoPor.nome || 'Empresa'}
                </Text>
              )}
              {item.resposta.data && (
                <Text style={{ color: '#888', fontSize: 11, marginTop: 2 }}>
                  Em: {new Date(item.resposta.data).toLocaleString()}
                </Text>
              )}
            </View>
          </View>
        )}

        {/**
         * 🌟 SISTEMA DE AVALIAÇÃO
         * Exibe avaliação existente ou botão para avaliar
         */}
        {renderAvaliacaoExistente()}
        {renderBotaoAvaliacao()}
      </View>

      {/* Modal de Avaliação */}
      <ModalAvaliarReclamacao
        visible={modalAvaliacaoVisivel}
        onClose={() => setModalAvaliacaoVisivel(false)}
        reclamacao={item}
        onAvaliar={handleAvaliar}
      />
    </>
  );
}
