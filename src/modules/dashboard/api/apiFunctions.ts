import axios from 'axios';
import { url } from '../../../helpers/api/backend';

export interface IDashBoard {
 users: number;
 patients: number;
 medicine: number;
 revenue: number;
 treatment: number;
}

export async function getDashBoard(): Promise<IDashBoard[]> {
  const result = await axios.get(`${url}/dashboard/get`);
  const { data } = result;

  return data;
}
