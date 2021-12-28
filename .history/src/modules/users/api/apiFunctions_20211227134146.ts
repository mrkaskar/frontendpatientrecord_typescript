import axios from 'axios';
import { url } from '../../../helpers/api/backend';

export interface IUser {
  id: string;
  email: string;
  name: string;
  type: string;
}

export async function getAllUsers(): Promise<IUser[]> {
  const result = await axios.get(`${url}/users/get`);
  const { data } = result;

  return data;
}

export async function createUser(data: IUser): Promise<void> {
  try {
    await axios.post(`${url}/users/add`, data);
  } catch {
    throw new Error();
  }
}

export async function updateUser(data: IUser): Promise<void> {
  try {
    await axios.post(`${url}/users/update`, data);
  } catch {
    throw new Error();
  }
}

export async function deleteUser(data:{id: string}): Promise<void> {
  try {
    await axios.post(`${url}/users/delete`, data);
  } catch {
    throw new Error();
  }
}
