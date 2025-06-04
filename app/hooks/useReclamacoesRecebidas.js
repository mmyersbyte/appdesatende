import { useState, useEffect } from 'react';
import { buscarReclamacoesRecebidas } from '../api/reclamacao';

export function useReclamacoesRecebidas() {
  const [reclamacoes, setReclamacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const dados = await buscarReclamacoesRecebidas();
        setReclamacoes(dados);
      } catch (e) {
        console.error('Erro ao buscar reclamações recebidas:', e);
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  return { reclamacoes, carregando };
}
