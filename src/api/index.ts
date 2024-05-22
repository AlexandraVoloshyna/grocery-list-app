import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.102:3000/',
});

export const fetchGroceries = async () => {
  const response = await api.get('/groceries');
  return response.data;
};
