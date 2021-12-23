import axios from 'axios';
import { url } from '../../../helpers/api/backend';

export interface IPatient {
  id: string;
  reg: string;
  name: string;
  phone: string;
  age: string;
  address: string;
  date: string;
  treatment: {name: string, charge: string}[];
  medicine: {name: string, price: string}[];
  medCount: number[];
  images: string[];
}

export async function getAllPatient(): Promise<IPatient[]> {
  const result = await axios.get(`${url}/patients/get`);
  const { data } = result;

  return data;
}

export async function createPatient<T>(data:T): Promise<void> {
  alert(JSON.stringify(data));
  try {
    await axios.post(`${url}/patients/add`, data);
  } catch {
    throw new Error();
  }
}
