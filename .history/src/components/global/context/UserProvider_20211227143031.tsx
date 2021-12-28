import { createContext } from 'react';

type User = 'admin' | 'casher';

export interface Iuser {
  name: string;
  type: string;
}

export const UserContext = createContext<Iuser>({
  name: '',
  type: '',
});
