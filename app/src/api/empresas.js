import api from './axios';
export async function buscarEmpresas() {
  const response = await api.get('/empresas/listar-empresas');
  return response.data.empresas;
}
