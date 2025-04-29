import axios from 'axios';

// Troque para o IP da sua máquina se for testar em dispositivo físico
const BASE_URL = 'http://10.0.2.2:5000/api';

// Função para cadastro de usuário ou empresa
export async function cadastrar({ nome, email, senha, tipo }) {
  const url =
    tipo === 'cliente'
      ? `${BASE_URL}/users/register`
      : `${BASE_URL}/empresas/register`;
  return axios.post(url, { nome, email, senha });
}

// Função para login de usuário ou empresa
export async function login({ email, senha, tipo }) {
  const url =
    tipo === 'cliente'
      ? `${BASE_URL}/users/login`
      : `${BASE_URL}/empresas/login`;
  return axios.post(url, { email, senha });
}
