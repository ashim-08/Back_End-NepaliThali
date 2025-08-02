import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Products API
export const productsAPI = {
  getAll: () => api.get('/product'),
  create: (data) => api.post('/product', data),
  update: (data) => api.patch('/product', data),
  delete: (id) => api.delete('/product', { data: { id } }),
};

// Orders API
export const ordersAPI = {
  getAll: () => api.get('/order'),
  update: (data) => api.patch('/order', data),
  delete: (id) => api.delete('/order', { data: { id } }),
};

// Users API
export const usersAPI = {
  login: (credentials) => api.post('/user/login', credentials),
  signup: (data) => api.post('/user/signup', data),
  updatePassword: (data) => api.patch('/user', data),
  delete: () => api.delete('/user'),
};

export default api;