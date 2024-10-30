import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const register = async (username, password) => {
    const response = await axios.post("http://0.0.0.0:8000/api/auth/register", {
      username,
      password,
    });
    setUser(response.data.user);
  };

  const login = async (username, password) => {
    const response = await axios.post("http://0.0.0.0:8000/api/auth/login", {
      username,
      password,
    });
    setUser(response.data.user);
  };

  const logout = () => {
    setUser(null);
    // Handle JWT removal or any other cleanup
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
