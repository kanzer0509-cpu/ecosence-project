import api from './api';

export const getOutdoorData = async (location: string) => {
  const response = await api.get('/outdoor', {
    params: { location },
  });

  return response.data;
};