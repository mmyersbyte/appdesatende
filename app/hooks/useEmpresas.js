import { useState, useEffect } from 'react';
import { buscarEmpresas } from '../api/empresas';

export function useEmpresas() {
  const [empresas, setEmpresas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const dados = await buscarEmpresas();
        setEmpresas(dados);
      } catch (e) {
        console.error('Erro ao buscar empresas:', e);
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  return { empresas, carregando };
}
