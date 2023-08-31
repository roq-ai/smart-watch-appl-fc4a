import axios from 'axios';
import queryString from 'query-string';
import { BluetoothInterface, BluetoothGetQueryInterface } from 'interfaces/bluetooth';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getBluetooths = async (
  query?: BluetoothGetQueryInterface,
): Promise<PaginatedInterface<BluetoothInterface>> => {
  const response = await axios.get('/api/bluetooths', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createBluetooth = async (bluetooth: BluetoothInterface) => {
  const response = await axios.post('/api/bluetooths', bluetooth);
  return response.data;
};

export const updateBluetoothById = async (id: string, bluetooth: BluetoothInterface) => {
  const response = await axios.put(`/api/bluetooths/${id}`, bluetooth);
  return response.data;
};

export const getBluetoothById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/bluetooths/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteBluetoothById = async (id: string) => {
  const response = await axios.delete(`/api/bluetooths/${id}`);
  return response.data;
};
