import React, { createContext } from 'react';

type User = 'admin' | 'casher';

export interface Iuser {
  name: string;
  type: User;
}

export const UserContext = createContext<{
  user: Iuser
  setUser: React.Dispatch<React.SetStateAction<Iuser>>
}|null>(null) as React.Context<{
  user: Iuser
  setUser: React.Dispatch<React.SetStateAction<Iuser>>
}>;

function UserProvider({ children }: {children: JSX.Element}):JSX.Element {
  const [user, setUser] = React.useState<Iuser>({
    name: '',
    type: 'admin',
  });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
