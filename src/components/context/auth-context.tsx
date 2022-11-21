import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { AddAdminUser, login, logout, onUserStateChange } from '../../api/firebase';

const defaultValue = {
  user: null,
  login,
  logout,
};

const AuthContext = createContext<AuthContextProps>(defaultValue);

interface AuthContextProps {
  user: AddAdminUser | null;
  login: () => void;
  logout: () => void;
}

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AddAdminUser | null>(null);

  useEffect(() => {
    onUserStateChange((user) => {
      setUser(user);
    });
  }, []);

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
