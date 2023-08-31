import axios from 'axios';
import queryString from 'query-string';
import { ManufacturerInterface, ManufacturerGetQueryInterface } from 'interfaces/manufacturer';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getManufacturers = async (
  query?: ManufacturerGetQueryInterface,
): Promise<PaginatedInterface<ManufacturerInterface>> => {
  const response = await axios.get('/api/manufacturers', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createManufacturer = async (manufacturer: ManufacturerInterface) => {
  const response = await axios.post('/api/manufacturers', manufacturer);
  return response.data;
};

export const updateManufacturerById = async (id: string, manufacturer: ManufacturerInterface) => {
  const response = await axios.put(`/api/manufacturers/${id}`, manufacturer);
  return response.data;
};

export const getManufacturerById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/manufacturers/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteManufacturerById = async (id: string) => {
  const response = await axios.delete(`/api/manufacturers/${id}`);
  return response.data;
};
