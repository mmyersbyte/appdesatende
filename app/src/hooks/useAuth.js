import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  limparDadosAutenticacao,
  salvarDadosAutenticacao,
} from '../api/auth.js';

export function useAuth() {
  const [token, setToken] = useState(null);
  const [tipo, setTipo] = useState(null); // 'user' ou 'empresa'
  const [carregando, setCarregando] = useState(true);

  // FUNÇÃO PARA CARREGAR DADOS DO STORAGE
  const carregarDadosAutenticacao = async () => {
    try {
      setCarregando(true);
      const [tokenSalvo, tipoSalvo] = await Promise.all([
        AsyncStorage.getItem('token'),
        AsyncStorage.getItem('tipo'),
      ]);

      setToken(tokenSalvo);
      setTipo(tipoSalvo);
    } catch (error) {
      console.error('Erro ao carregar dados de autenticação:', error);
      setToken(null);
      setTipo(null);
    } finally {
      setCarregando(false);
    }
  };

  //  FUNÇÃO DE LOGIN INTEGRADA
  const fazerLogin = async (token, tipo) => {
    try {
      await salvarDadosAutenticacao(token, tipo);
      setToken(token);
      setTipo(tipo);
    } catch (error) {
      console.error('Erro ao salvar dados de login:', error);
      throw error;
    }
  };

  // FUNÇÃO DE LOGOUT INTEGRADA
  const fazerLogout = async () => {
    try {
      await limparDadosAutenticacao();
      setToken(null);
      setTipo(null);
    } catch (error) {
      console.error('Erro ao limpar dados de logout:', error);
      throw error;
    }
  };

  //  FUNÇÃO PARA VERIFICAR SE ESTÁ AUTENTICADO
  const estaAutenticado = () => {
    return !!(token && tipo);
  };

  // CARREGA DADOS AO INICIALIZAR
  useEffect(() => {
    carregarDadosAutenticacao();
  }, []);

  return {
    token,
    tipo,
    carregando,
    estaAutenticado: estaAutenticado(),
    fazerLogin,
    fazerLogout,
    recarregar: carregarDadosAutenticacao,
  };
}
