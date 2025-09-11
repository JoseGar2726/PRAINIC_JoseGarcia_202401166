import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    try {
      if (savedUser && savedUser !== "undefined") {
        const parsed = JSON.parse(savedUser);
        setUser(parsed.user || parsed); // para compatibilidad con antiguos guardados
      }
    } catch (error) {
      console.error("Error al parsear el usuario desde localStorage:", error);
      localStorage.removeItem("user");
    }
  }, []);

  const login = (userData) => {
    if (!userData) return;
    setUser(userData.user); // seguimos guardando solo el user para Navbar
    localStorage.setItem("user", JSON.stringify(userData)); // guardamos todo userData
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

