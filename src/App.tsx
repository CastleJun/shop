import './App.css';

import React from 'react';
import { Outlet } from 'react-router-dom';

import { AuthContextProvider } from './components/context/auth-context';
import Navbar from './components/navbar';

const App = () => {
  return (
    <AuthContextProvider>
      <Navbar />
      <Outlet />
    </AuthContextProvider>
  );
};

export default App;
