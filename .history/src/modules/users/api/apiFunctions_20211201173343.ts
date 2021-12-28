import axios from 'axios';
import { url } from '../../../helpers/api/backend';

export interface ITreatment {
  trecode: string;
  name: string;
  charge: string;
}

export async function getAllUsers(): Promise<ITreatment> {
  const result = await axios.get(`${url}/treatments`);
  const { data } = result;

  return data;
}
