import axios from 'axios';
import { url } from '../../../helpers/api/backend';

export interface IPatient {
  id: string;
  reg: string;
  name: string;
  phone: string;
  age: string;
  address: string;
  folderId: string;
  total: number;
  date: string;
  treatment: {_id: string, name: string, charge: string}[];
  medicine: {_id: string, name: string, price: string, stock: string}[];
  medCount: number[];
  images: string[];
}

export async function getAllPatient(): Promise<IPatient[]> {
  const result = await axios.get(`${url}/patients/get`);
  const { data } = result;

  return data;
}

export interface IUploadPatient {
  name: string;
  phone: string;
  address: string;
  regNum: string;
  age: string;
  total: number;
  treatments: string;
  medicine: string;
  images: string;
  id?:string;
}
export async function createPatient(data:IUploadPatient): Promise<void> {
  try {
    await axios.post(`${url}/patients/add`, data);
  } catch {
    throw new Error();
  }
}

export async function updatePatient(data:IUploadPatient): Promise<void> {
  try {
    await axios.post(`${url}/patients/update`, data);
  } catch {
    throw new Error();
  }
}

export async function deletePatient(data:{id: string, folderId: string}): Promise<void> {
  try {
    await axios.post(`${url}/patients/delete`, data);
  } catch {
    throw new Error();
  }
}
