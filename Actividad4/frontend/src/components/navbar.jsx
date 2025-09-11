import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "../styles/navbar.css"; // Importamos los estilos

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/inicio">Inicio</Link>
        <Link to="/perfil">Perfil</Link>
        <Link to="/crear-publicacion">Crear Publicación</Link>
      </div>

      <div className="nav-user">
        {user ? (
          <>
            <span>Sesión: {user.nombres} {user.apellidos}</span>
            <button onClick={handleLogout} className="logout-btn">Cerrar Sesión</button>
          </>
        ) : (
          <Link to="/">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
