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

/**
 * Remove resposta de uma reclamação
 * @param {string} id - ID da reclamação
 * @returns {Promise<Object>} - Resposta da API
 */
export const removerResposta = async (id) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await api.delete(`/reclamacoes/${id}/remover-resposta`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao remover resposta da reclamação:', error);
    throw error;
  }
};

/**
 * 🌟 SISTEMA DE AVALIAÇÃO DE RECLAMAÇÕES
 * Permite aos clientes avaliar a qualidade das respostas das empresas
 *
 * FUNCIONALIDADES:
 * ✅ Avaliação por estrelas (1-5)
 * ✅ Indicador se problema foi resolvido (true/false)
 * ✅ Comentário opcional para feedback detalhado
 * ✅ Validação automática no backend
 * ✅ Atualização de status da reclamação
 *
 * @param {string} id - ID único da reclamação a ser avaliada
 * @param {Object} avaliacaoData - Dados da avaliação
 * @param {number} avaliacaoData.estrelas - Avaliação de 1 a 5 estrelas
 * @param {boolean} avaliacaoData.problemaResolvido - Se o problema foi resolvido
 * @param {string} [avaliacaoData.comentario] - Comentário opcional (min 10 chars)
 * @returns {Promise<Object>} Reclamação atualizada com avaliação
 *
 * EXEMPLO DE USO:
 * ```javascript
 * const avaliacao = await avaliarReclamacao('123', {
 *   estrelas: 5,
 *   problemaResolvido: true,
 *   comentario: 'Excelente atendimento, problema resolvido rapidamente!'
 * });
 * ```
 */
export const avaliarReclamacao = async (id, avaliacaoData) => {
  try {
    /**
     * VALIDAÇÃO LOCAL: Dados obrigatórios
     * Verifica dados essenciais antes de enviar ao backend
     */
    if (
      !avaliacaoData.estrelas ||
      typeof avaliacaoData.problemaResolvido !== 'boolean'
    ) {
      throw new Error(
        'Estrelas (1-5) e status do problema (resolvido/não resolvido) são obrigatórios'
      );
    }

    /**
     * VALIDAÇÃO LOCAL: Range de estrelas
     * Garante que estrelas estão no intervalo correto
     */
    if (
      !Number.isInteger(avaliacaoData.estrelas) ||
      avaliacaoData.estrelas < 1 ||
      avaliacaoData.estrelas > 5
    ) {
      throw new Error(
        'A avaliação deve ser um número inteiro entre 1 e 5 estrelas'
      );
    }

    /**
     * PREPARAÇÃO: Estrutura dos dados
     * Organiza dados conforme esperado pelo backend
     */
    const dadosAvaliacao = {
      estrelas: avaliacaoData.estrelas,
      problemaResolvido: avaliacaoData.problemaResolvido,
    };

    // Adiciona comentário apenas se foi fornecido e não está vazio
    if (
      avaliacaoData.comentario &&
      avaliacaoData.comentario.trim().length > 0
    ) {
      dadosAvaliacao.comentario = avaliacaoData.comentario.trim();
    }

    /**
     * AUTENTICAÇÃO: Token de usuário
     * Obtém token do AsyncStorage para autorização
     */
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error(
        'Token de autenticação não encontrado. Faça login novamente.'
      );
    }

    /**
     * REQUISIÇÃO: Envio da avaliação
     * POST para endpoint de avaliação com dados e autorização
     */
    const response = await api.post(
      `/reclamacoes/${id}/avaliar`,
      dadosAvaliacao,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    /**
     * RESPOSTA DE SUCESSO
     * Retorna dados da reclamação atualizada
     */
    console.log('✅ Avaliação registrada:', response.data.avaliacaoDetalhes);
    return response.data;
  } catch (error) {
    /**
     * TRATAMENTO DE ERROS
     * Logs detalhados e propagação do erro para o componente
     */
    console.error('❌ Erro ao avaliar reclamação:', {
      reclamacaoId: id,
      dadosEnviados: avaliacaoData,
      erro: error?.response?.data || error.message,
    });

    // Re-throw com mensagem mais amigável se disponível
    const mensagemErro =
      error?.response?.data?.msg ||
      error.message ||
      'Erro ao registrar avaliação';
    throw new Error(mensagemErro);
  }
};
