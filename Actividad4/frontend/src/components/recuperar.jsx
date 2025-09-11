import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/recuperar.css";

const RecuperarPassword = () => {
  const [registroAcademico, setRegistro] = useState("");
  const [correo, setCorreo] = useState("");
  const [nuevaPassword, setNuevaPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!registroAcademico || !correo || !nuevaPassword) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/recuperar-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          registroAcademico,
          correo,
          nuevaPassword
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || "Contraseña actualizada correctamente");
        navigate("/");
      } else {
        alert(data.message || "Error al actualizar contraseña");
      }
    } catch (err) {
      console.error("Error al recuperar contraseña:", err);
      alert("Error al recuperar contraseña");
    }
  };

  return (
    <div className="recuperar-container">
      <h2>Recuperar Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Registro Académico:</label>
          <input
            type="text"
            value={registroAcademico}
            onChange={(e) => setRegistro(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Correo:</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Nueva Contraseña:</label>
          <input
            type="password"
            value={nuevaPassword}
            onChange={(e) => setNuevaPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Actualizar Contraseña</button>
      </form>

      <p>
        <Link to="/">Iniciar Sesion</Link>
      </p>
    </div>
  );
};

export default RecuperarPassword;
