import axios from 'axios';
import { url } from '../../../helpers/api/backend';

export interface ITreatment {
  id: string;
  trecode: string;
  name: string;
  charge: string;
}

export async function getAllTreatment(): Promise<ITreatment[]> {
  const result = await axios.get(`${url}/treatment/get`);
  const { data } = result;

  return data;
}

export async function createTreatment(data: ITreatment): Promise<void> {
  try {
    await axios.post(`${url}/treatment/add`, data);
  } catch {
    throw new Error();
  }
}

export async function updateTreatment(data: ITreatment): Promise<void> {
  try {
    await axios.post(`${url}/treatment/update`, data);
  } catch {
    throw new Error();
  }
}

export async function deleteTreatment(data:{id: string}): Promise<void> {
  try {
    await axios.post(`${url}/treatment/delete`, data);
  } catch {
    throw new Error();
  }
}
