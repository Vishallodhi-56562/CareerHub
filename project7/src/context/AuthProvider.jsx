// src/AuthProvider.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("careerhub_auth");
    return raw ? JSON.parse(raw).user : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("careerhub_token") || null);

  useEffect(() => {
    if (token && user) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("careerhub_token", token);
      localStorage.setItem("careerhub_auth", JSON.stringify({ user }));
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token, user]);

  const login = (data) => {
    setUser(data.user);
    setToken(data.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("careerhub_token");
    localStorage.removeItem("careerhub_auth");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
