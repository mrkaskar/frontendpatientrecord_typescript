import axios from 'axios';
import { url } from '../../../helpers/api/backend';

export interface IMed {
  id: string;
  medcode: string;
  name: string;
  price: string;
  stock: string;
}

export async function getAllMed(): Promise<IMed[]> {
  const result = await axios.get(`${url}/medicine/get`);
  const { data } = result;

  return data;
}

export async function createMed(data: IMed): Promise<void> {
  try {
    await axios.post(`${url}/medicine/add`, data);
  } catch {
    throw new Error();
  }
}

export async function updateMed(data: IMed): Promise<void> {
  try {
    await axios.post(`${url}/medicine/update`, data);
  } catch {
    throw new Error();
  }
}

export async function deleteMedicine(data:{id: string}): Promise<void> {
  try {
    await axios.post(`${url}/medicine/delete`, data);
  } catch {
    throw new Error();
  }
}
