import React, { createContext } from 'react';

type User = 'admin' | 'casher';

export interface Iuser {
  user: {
    name: string;
    type: string;
  }
  setUser: React.Dispatch<React.SetStateAction<Iuser>>
}

export const UserContext = createContext<Iuser>({
});

function UserProvider({ children }: {children: JSX.Element}):JSX.Element {
  const [user, setUser] = React.useState<Iuser>({
    name: '',
    type: '',
  });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
