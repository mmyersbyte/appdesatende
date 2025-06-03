import api from './axios';

// Serviço para criar uma nova reclamação
export const criarReclamacao = async (dados, token) => {
  const response = await api.post('/reclamacoes', dados, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
