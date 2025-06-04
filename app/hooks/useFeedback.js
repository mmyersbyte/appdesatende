import { useState } from 'react';

export function useFeedback() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null); // mensagem de sucesso
  const [error, setError] = useState(null); // mensagem de erro

  function showSuccess(msg) {
    setSuccess(msg);
    setError(null);
    setLoading(false);
  }

  function showError(msg) {
    setError(msg);
    setSuccess(null);
    setLoading(false);
  }

  function resetFeedback() {
    setSuccess(null);
    setError(null);
    setLoading(false);
  }

  return {
    loading,
    setLoading,
    success,
    setSuccess,
    error,
    setError,
    showSuccess,
    showError,
    resetFeedback,
  };
}
