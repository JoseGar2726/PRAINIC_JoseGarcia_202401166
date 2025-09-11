import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "../styles/login.css";

const Login = () => {
  const [registroAcademico, setRegistro] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registroAcademico, passUser: password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        login(data);
        navigate("/inicio");
        console.log("Usuario:", data.user);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error al conectar con backend: ", error);
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
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
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Ingresar</button>
      </form>

      <p>
        ¿No tienes cuenta? <Link to="/register">Crear usuario</Link>
      </p>
    </div>
  );
};

export default Login;
