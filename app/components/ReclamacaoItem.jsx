import React from 'react';
import { View, Text, Image } from 'react-native';

export default function ReclamacaoItem({ item }) {
  return (
    <View style={{ padding: 16, borderBottomWidth: 1, borderColor: '#222' }}>
      {/* Exibe a imagem da reclamação, se existir */}
      {item.imagem && item.imagem.data && (
        <Image
          source={{
            uri: `data:${item.imagem.contentType};base64,${item.imagem.data}`,
          }}
          style={{
            width: 120,
            height: 120,
            borderRadius: 10,
            marginBottom: 8,
          }}
          resizeMode='cover'
        />
      )}
      <Text style={{ fontWeight: 'bold', color: '#ECDCBF', fontSize: 16 }}>
        {item.titulo}
      </Text>
      <Text style={{ color: '#fff', marginTop: 4 }}>{item.descricao}</Text>
      <Text style={{ color: '#bbb', marginTop: 4 }}>
        Empresa: {item.empresa?.nome || 'N/A'}
      </Text>
      <Text style={{ color: '#888', fontSize: 12, marginTop: 2 }}>
        Criada em: {new Date(item.createdAt).toLocaleString()}
      </Text>
      {/* Exibe a resposta da empresa, se existir */}
      {item.resposta && item.resposta.texto && (
        <View
          style={{
            backgroundColor: '#232326',
            borderRadius: 8,
            padding: 10,
            marginTop: 10,
          }}
        >
          <Text
            style={{ color: '#4ecdc4', fontWeight: 'bold', marginBottom: 4 }}
          >
            Resposta da empresa:
          </Text>
          <Text style={{ color: '#fff' }}>{item.resposta.texto}</Text>
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
      )}
    </View>
  );
}
