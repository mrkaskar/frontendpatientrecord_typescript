import axios from 'axios';
import { url } from '../../../helpers/api/backend';

export interface IPatient {
  reg: string;
  name: string;
  phone: string;
  age: string;
  address: string;
  treatment: string[];
  medicine: string[];
}

export async function getAllPatient(): Promise<IPatient[]> {
  const result = await axios.get(`${url}/patients`);
  const { data } = result;

  return data;
}
