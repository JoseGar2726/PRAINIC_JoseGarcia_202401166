import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/verUsuario.css";

const VerUsuario = () => {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/usuarios/id/${id}`)
      .then(res => {
        if (!res.ok) {
          return res.json().then(err => { throw new Error(err.message); });
        }
        return res.json();
      })
      .then(data => setUsuario(data))
      .catch(err => setUsuario({ error: err.message }));
  }, [id]);

  return (
    <div className="container">
      {!usuario && <p className="loading">Cargando usuario...</p>}
      {usuario?.error && <p className="error">{usuario.error}</p>}
      {usuario && !usuario.error && (
        <div className="user-card">
          <h2>{usuario.nombres} {usuario.apellidos}</h2>
          <p><strong>Registro Académico:</strong> {usuario.registro_academico}</p>
          <p><strong>Correo:</strong> {usuario.correo}</p>
          <Link to="/inicio" className="back-btn">Volver</Link>
        </div>
      )}
    </div>
  );
};

export default VerUsuario;