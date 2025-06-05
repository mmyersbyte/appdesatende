import api from './axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Cadastro de usuário
export const cadastrarUsuario = async (dados) => {
  const response = await api.post('/users/cadastrar', dados);
  return response.data;
};

// Login de usuário
export const loginUsuario = async (dados) => {
  const response = await api.post('/users/login', dados);
  return response.data;
};

// Login de empresa
export const loginEmpresa = async (dados) => {
  const response = await api.post('/empresas/login', dados);
  return response.data;
};

// Cadastro de empresa
export const cadastrarEmpresa = async (dados) => {
  const response = await api.post('/empresas/cadastrar', dados);
  return response.data;
};

// Utilitários para token JWT
export const salvarToken = async (token) => {
  await AsyncStorage.setItem('token', token);
};

export const obterToken = async () => {
  return await AsyncStorage.getItem('token');
};
