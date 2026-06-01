import api from './api';

export interface AuthUser {
  id?: number;
  email: string;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export const register = async (data: AuthRequest) => {
  const response = await api.post('/auth/register', data);
  return response.data;
};

export const login = async (data: AuthRequest) => {
  const response = await api.post('/auth/login', data);
  return response.data;
};

export const logout = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};

export const getMe = async (): Promise<AuthUser> => {
  const response = await api.get('/auth/me');
  return response.data;
};