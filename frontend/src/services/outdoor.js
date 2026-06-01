import api from './api';

export const getOutdoorData = async (location) => {
  const response = await api.get('/outdoor', {
    params: { location },
  });

  return response.data;
};