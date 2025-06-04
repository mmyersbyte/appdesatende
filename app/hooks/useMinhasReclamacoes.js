import { useState, useEffect } from 'react';
import { buscarMinhasReclamacoes } from '../api/reclamacao';

export function useMinhasReclamacoes() {
  const [reclamacoes, setReclamacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const dados = await buscarMinhasReclamacoes();
        setReclamacoes(dados);
      } catch (e) {
        console.error('Erro ao buscar reclamações:', e);
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  return { reclamacoes, carregando };
}
