import React from "react";
import Navbar from "./navbar";
import { useAuth } from "../AuthContext";

const Perfil = () => {
  const { user } = useAuth();

  return (
    <div>
      <Navbar />
      <h1>Perfil del Usuario</h1>
      {user ? (
        <div>
          <p><b>Registro:</b> {user.registro_academico}</p>
          <p><b>Nombre:</b> {user.nombres} {user.apellidos}</p>
          <p><b>Correo:</b> {user.correo}</p>
        </div>
      ) : (
        <p>No hay usuario logueado.</p>
      )}
    </div>
  );
};

export default Perfil;