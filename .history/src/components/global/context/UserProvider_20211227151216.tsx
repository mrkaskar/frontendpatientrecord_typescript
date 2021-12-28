import React, { createContext } from 'react';

type User = 'admin' | 'casher';

export interface Iuser {
  name: string;
  type: string;
}

export const UserContext = createContext<{
  user: Iuser
  setUser: React.Dispatch<React.SetStateAction<Iuser>>
}>({
  user: { name: '', type: '' },
  setUser: () => void,
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
