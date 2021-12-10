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
  const result = await axios.get(`${url}/medication`);
  const { data } = result;

  return data;
}
