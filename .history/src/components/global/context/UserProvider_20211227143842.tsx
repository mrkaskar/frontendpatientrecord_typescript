import React, { createContext } from 'react';

type User = 'admin' | 'casher';

export interface Iuser {
  name: string;
  type: string;
}

export const UserContext = createContext<Iuser>({
  name: '',
  type: '',
});

function UserProvider({ children }: {children: JSX.Element}):JSX.Element {
  const [user, setUser] = React.useState<Iuser>({
    name: 'someone',
    type: 'admin',
  });
}
