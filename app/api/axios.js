import axios from 'axios';
import Constants from 'expo-constants';

// Configuração do base URL usando variável de ambiente Expo
const baseURL = Constants.expoConfig?.extra?.API_BASE_URL;

const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
