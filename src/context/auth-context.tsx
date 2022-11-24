import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { AddAdminUser, login, logout, onUserStateChange } from '../api/firebase';

const defaultValue = {
  user: null,
  login,
  logout,
  uid: null,
};

const AuthContext = createContext<AuthContextProps>(defaultValue);

interface AuthContextProps {
  user: AddAdminUser | null;
  login: () => void;
  logout: () => void;
  uid: string | null;
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
      uid: user && user.uid,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
