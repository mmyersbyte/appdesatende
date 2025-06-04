import api from './axios';

// Busca todas as empresas cadastradas no backend
export async function buscarEmpresas() {
  const response = await api.get('/empresas/listar-empresas');
  return response.data.empresas;
}
