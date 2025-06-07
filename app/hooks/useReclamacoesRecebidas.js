import { useEffect } from 'react';
import { buscarReclamacoesRecebidas } from '../api/reclamacao';
import { useRefresh } from './useRefresh';

/**
 * 🏢 HOOK DE RECLAMAÇÕES RECEBIDAS
 *
 * Hook especializado para buscar reclamações recebidas por empresas
 * Refatorado para usar o hook genérico useRefresh
 *
 * @returns {Object} - { reclamacoes, carregando, refresh }
 */
export function useReclamacoesRecebidas() {
  // Usa o hook genérico com a função específica de buscar reclamações
  const {
    data: reclamacoes,
    loading: carregando,
    refresh,
  } = useRefresh(buscarReclamacoesRecebidas);

  // Carrega dados automaticamente na primeira renderização
  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    reclamacoes,
    carregando,
    refresh,
  };
}
