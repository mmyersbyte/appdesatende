//PERFIL CLIENTEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
import { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image } from 'react-native';

import estilos from './estilos/estilosPerfil';

import { FontAwesome } from '@expo/vector-icons';
// Importa o hook de navegação do Expo Router para navegar entre telas
import { useRouter } from 'expo-router';

import Rodape from './components/Rodape';
import { buscarMinhasReclamacoes } from './api/reclamacao';

export default function PerfilScreen() {
  const router = useRouter();
  const [reclamacoes, setReclamacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const dados = await buscarMinhasReclamacoes();
        setReclamacoes(dados);
      } catch (e) {
        // Trate o erro se quiser
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#1A1A1D' }}>
      {carregando ? (
        <ActivityIndicator
          size='large'
          color='#D84040'
          style={{ marginTop: 40 }}
        />
      ) : (
        <FlatList
          data={reclamacoes}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View
              style={{ padding: 16, borderBottomWidth: 1, borderColor: '#222' }}
            >
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
              <Text
                style={{ fontWeight: 'bold', color: '#ECDCBF', fontSize: 16 }}
              >
                {item.titulo}
              </Text>
              <Text style={{ color: '#fff', marginTop: 4 }}>
                {item.descricao}
              </Text>
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
                    style={{
                      color: '#4ecdc4',
                      fontWeight: 'bold',
                      marginBottom: 4,
                    }}
                  >
                    Resposta da empresa:
                  </Text>
                  <Text style={{ color: '#fff' }}>{item.resposta.texto}</Text>
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
              )}
            </View>
          )}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', marginTop: 20, color: '#bbb' }}>
              Nenhuma reclamação encontrada.
            </Text>
          }
        />
      )}
      <Rodape
        selecionado='perfil'
        navegar={(destino) => {
          if (destino === 'home') router.push('/home');
          if (destino === 'perfil') router.push('/perfil');
        }}
      />
    </View>
  );
}
