import React from 'react';
import { View, Text, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function ReclamacaoItem({ item }) {
  return (
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
      <Text
        style={{
          fontWeight: 'bold',
          color: '#FFD369',
          fontSize: 20,
          marginBottom: 4,
          letterSpacing: 0.2,
        }}
      >
        {item.titulo}
      </Text>

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
      {(!item.resposta || !item.resposta.texto) && item.status === 'aberta' && (
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
          <Text style={{ color: '#D84040', fontWeight: 'bold', fontSize: 14 }}>
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
              style={{ color: '#4ecdc4', fontWeight: 'bold', marginBottom: 2 }}
            >
              Resposta da empresa:
            </Text>
            <Text style={{ color: '#fff', fontSize: 15 }}>
              {item.resposta.texto}
            </Text>
            {item.resposta.respondidoPor && (
              <Text style={{ color: '#bbb', fontSize: 12, marginTop: 4 }}>
                Respondido por: {item.resposta.respondidoPor.nome || 'Empresa'}
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
    </View>
  );
}
