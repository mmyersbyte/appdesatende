import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useAuth() {
  const [token, setToken] = useState(null);
  const [tipo, setTipo] = useState(null); // 'user' ou 'empresa'
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      const t = await AsyncStorage.getItem('token');
      const tipoSalvo = await AsyncStorage.getItem('tipo');
      setToken(t);
      setTipo(tipoSalvo);
      setCarregando(false);
    }
    carregar();
  }, []);

  return { token, tipo, carregando };
}
