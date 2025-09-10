import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav style={{ display: "flex", gap: "15px", padding: "10px", background: "#eee" }}>
      <Link to="/inicio">Inicio</Link>
      <Link to="/perfil">Perfil</Link>

      {user ? (
        <>
          <span>Sesión: {user.nombres} {user.apellidos}</span>
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </>
      ) : (
        <Link to="/">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;