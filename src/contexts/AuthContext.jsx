import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("user");
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const login = (userData, callback) => {
    setUser(userData);
    try {
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (e) {}
    if (callback) callback();
  };

  const loginAsGuest = (callback) => {
    const guestUser = { guest: true };
    setUser(guestUser);
    try {
      localStorage.setItem("user", JSON.stringify(guestUser));
    } catch (e) {}
    if (callback) callback();
  };

  const logout = (callback) => {
    setUser(null);
    try {
      localStorage.removeItem("user");
    } catch (e) {}
    if (callback) callback();
  };

  return (
    <AuthContext.Provider value={{ user, login, loginAsGuest, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
