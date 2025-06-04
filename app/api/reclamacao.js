import api from './axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Serviço para criar uma nova reclamação
export const criarReclamacao = async (dados, token) => {
  const response = await api.post('/reclamacoes', dados, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Busca todas as reclamações do usuário autenticado
export async function buscarMinhasReclamacoes() {
  // Recupera o token JWT salvo após o login
  const token = await AsyncStorage.getItem('token');
  // Faz a requisição enviando o token no header Authorization
  const response = await api.get('/reclamacoes/meu-perfil', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

// Busca todas as reclamações recebidas pela empresa autenticada
export async function buscarReclamacoesRecebidas() {
  // Recupera o token JWT salvo após o login
  const token = await AsyncStorage.getItem('token');
  // Faz a requisição enviando o token no header Authorization
  const response = await api.get('/reclamacoes/empresa', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

// Envia resposta para uma reclamação (empresa)
export async function responderReclamacao(id, texto) {
  const token = await AsyncStorage.getItem('token');
  const response = await api.patch(
    `/reclamacoes/${id}/responder`,
    { texto },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}
