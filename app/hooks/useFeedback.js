import { useState } from 'react';
import { Alert } from 'react-native';

export function useFeedback() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null); // mensagem de sucesso
  const [error, setError] = useState(null); // mensagem de erro

  function showSuccess(msg) {
    setSuccess(msg);
    setError(null);
    setLoading(false);
    Alert.alert('Sucesso', msg);
  }

  function showError(msg) {
    setError(msg);
    setSuccess(null);
    setLoading(false);
    Alert.alert('Erro', msg);
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
