import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token automaticamente
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Erro ao recuperar token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar respostas de erro
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token inválido ou expirado
      await AsyncStorage.removeItem('userToken');
      // Aqui você pode redirecionar para a tela de login
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  cadastrar: (userData) => api.post('/usuarios/cadastrar-usuario', userData),
  login: (credentials) => api.post('/usuarios/login', credentials),
};

export const livrosAPI = {
  listar: (params) => api.get('/livros/listar', { params }),
  todos: () => api.get('/livros/todos'),
  cadastrar: (livroData) => api.post('/livros/cadastrar', livroData),
  salvarLivros: (titulo) => api.post('/livros/salvar-livros', { titulo }),
};

export const avaliacoesAPI = {
  listar: (idLivro) => api.get(`/avaliacoes/${idLivro}`),
  cadastrar: (avaliacaoData) => api.post('/avaliacoes/cadastrar', avaliacaoData),
  atualizar: (id, avaliacaoData) => api.put(`/avaliacoes/atualizar/${id}`, avaliacaoData),
  excluir: (id) => api.delete(`/avaliacoes/excluir/${id}`),
};

export default api;