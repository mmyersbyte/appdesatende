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

// 🆕 FUNÇÃO COMPLETA DE AUTENTICAÇÃO
export const salvarDadosAutenticacao = async (token, tipo) => {
  await Promise.all([
    AsyncStorage.setItem('token', token),
    AsyncStorage.setItem('tipo', tipo),
  ]);
};

// 🆕 FUNÇÃO DE LOGOUT COMPLETA
export const limparDadosAutenticacao = async () => {
  await Promise.all([
    AsyncStorage.removeItem('token'),
    AsyncStorage.removeItem('tipo'),
  ]);
};
