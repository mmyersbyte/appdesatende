import { useState, useEffect, useCallback } from 'react';
import { buscarReclamacoesRecebidas } from '../api/reclamacao';

export function useReclamacoesRecebidas() {
  const [reclamacoes, setReclamacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const carregar = useCallback(async () => {
    setCarregando(true);
    try {
      const dados = await buscarReclamacoesRecebidas();
      setReclamacoes(dados);
    } catch (e) {
      console.error('Erro ao buscar reclamações recebidas:', e);
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  return { reclamacoes, carregando, refresh: carregar };
}
