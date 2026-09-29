import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginApi } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => sessionStorage.getItem('mbct_admin') === 'true'
  );
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const stored = sessionStorage.getItem('mbct_admin_user');
      return stored ? JSON.parse(stored) : { fullName: 'Senthilkumar', email: 'senthilkumar@gmail.com', role: 'SuperAdmin' };
    } catch {
      return { fullName: 'Senthilkumar', email: 'senthilkumar@gmail.com', role: 'SuperAdmin' };
    }
  });

  const login = async (email, password) => {
    const res = await loginApi(email, password);
    if (res.success) {
      sessionStorage.setItem('mbct_admin', 'true');
      if (res.token) sessionStorage.setItem('mbct_token', res.token);
      if (res.admin) {
        sessionStorage.setItem('mbct_admin_user', JSON.stringify(res.admin));
        setAdminUser(res.admin);
      }
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem('mbct_admin');
    sessionStorage.removeItem('mbct_token');
    sessionStorage.removeItem('mbct_admin_user');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, adminUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
