import { useState, useCallback } from 'react';

export function useRefresh(fetchFunction) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    if (!fetchFunction || typeof fetchFunction !== 'function') {
      console.warn('useRefresh: fetchFunction deve ser uma função válida');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      console.error('Erro no refresh:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [fetchFunction]);

  return {
    data,
    loading,
    refresh,
    error,
  };
}

export function useSimpleRefresh(refreshCallback) {
  const refresh = useCallback(async () => {
    if (refreshCallback && typeof refreshCallback === 'function') {
      try {
        await refreshCallback();
      } catch (error) {
        console.error('Erro no refresh simples:', error);
      }
    }
  }, [refreshCallback]);

  return refresh;
}
