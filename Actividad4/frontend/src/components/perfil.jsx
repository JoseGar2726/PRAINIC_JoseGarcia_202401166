import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import { useAuth } from "../AuthContext";
import "../styles/perfil.css";

const Perfil = () => {
  const { user, actualizarUsuario } = useAuth();
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        nombres: user.nombres || "",
        apellidos: user.apellidos || "",
        correo: user.correo || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3001/api/actualizar-perfil`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          registroAcademico: user.registro_academico,
          nombres: formData.nombres,
          apellidos: formData.apellidos,
          correo: formData.correo,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message || "Datos actualizados correctamente");
        actualizarUsuario(data.usuarioActualizado);
      } else {
        alert(data.message || "Error al actualizar datos");
      }
    } catch (err) {
      console.error("Error al actualizar perfil:", err);
      alert("Error al actualizar perfil");
    }
  };

  return (
    <>
      <Navbar />
      <div className="perfil-container">
        <h2>Mi Perfil</h2>
        <form onSubmit={handleSubmit} className="perfil-form">
          <div className="form-group">
            <label>Registro Académico:</label>
            <input type="text" value={user.registro_academico} disabled />
          </div>
          <div className="form-group">
            <label>Nombres:</label>
            <input
              type="text"
              name="nombres"
              value={formData.nombres}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Apellidos:</label>
            <input
              type="text"
              name="apellidos"
              value={formData.apellidos}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Correo:</label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn-actualizar">Actualizar Perfil</button>
        </form>
      </div>
    </>
  );

  
};

export default Perfil;