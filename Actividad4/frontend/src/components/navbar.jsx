import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "../styles/navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleBuscar = async () => {
    if (!busqueda) return;

    try {
      
      const res = await fetch(`http://localhost:3001/api/usuarios/${busqueda}`);
      if (!res.ok) throw new Error("Usuario no registrado");

      const data = await res.json();
      
      navigate(`/verUsuario/${data.id_usuario}`);
    } catch (error) {
      alert("Usuario no registrado");
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleBuscar();
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/inicio">Inicio</Link>
        <Link to="/perfil">Perfil</Link>
        <Link to="/crear-publicacion">Crear Publicación</Link>
      </div>

      <div className="nav-search">
        <input
          type="text"
          placeholder="Buscar por registro academico"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          onKeyDown={handleEnter}
        />
        <button onClick={handleBuscar}>Buscar</button>
      </div>

      <div className="nav-user">
        {user ? (
          <>
            <span>Sesión: {user.nombres} {user.apellidos}</span>
            <button onClick={handleLogout} className="logout-btn">
              Cerrar Sesión
            </button>
          </>
        ) : (
          <Link to="/">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;