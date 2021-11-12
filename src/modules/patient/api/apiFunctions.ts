import axios from 'axios';
import { url } from '../../../helpers/api/backend';

export async function getAllPatient(): Promise<unknown> {
  const result = await axios.get(`${url}/patients`);
  const { data } = result;

  return data;
}
