import axios from 'axios';
import queryString from 'query-string';
import { WatchInterface, WatchGetQueryInterface } from 'interfaces/watch';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getWatches = async (query?: WatchGetQueryInterface): Promise<PaginatedInterface<WatchInterface>> => {
  const response = await axios.get('/api/watches', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createWatch = async (watch: WatchInterface) => {
  const response = await axios.post('/api/watches', watch);
  return response.data;
};

export const updateWatchById = async (id: string, watch: WatchInterface) => {
  const response = await axios.put(`/api/watches/${id}`, watch);
  return response.data;
};

export const getWatchById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/watches/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteWatchById = async (id: string) => {
  const response = await axios.delete(`/api/watches/${id}`);
  return response.data;
};
