import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import { useAuth } from "../AuthContext";
import "../styles/crearComentario.css";

const Comentarios = () => {
  const { id_publicacion } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [publicacion, setPublicacion] = useState(null);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const fetchPublicacion = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/publicaciones/${id_publicacion}`);
        const data = await res.json();
        setPublicacion(data);
      } catch (err) {
        console.error("Error al obtener publicación:", err);
      }
    };

    fetchPublicacion();
  }, [id_publicacion]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mensaje.trim()) {
      alert("No se ha comentado nada");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3001/api/comentarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_publicacion,
          id_usuario: user.id_usuario,
          mensaje
        })
      });

      if (res.ok) {
        alert("Comentario creado correctamente");
        navigate("/inicio");
      } else {
        const data = await res.json();
        alert(data.message || "Error al crear comentario");
      }
    } catch (err) {
      console.error("Error al crear comentario:", err);
      alert("Error al crear comentario");
    }
  };

  if (!publicacion) return <p>Cargando publicación...</p>;

  return (
    <div>
      <Navbar />

      <div className="comentarios-container">
        <h2 className="comentarios-title">Comentar publicación</h2>

        <div className="publicacion-card">
          <p className="publicacion-header">
            {publicacion.usuario_nombres} {publicacion.usuario_apellidos} 
            <span> ({publicacion.usuario_correo})</span>
          </p>
          <p className="publicacion-meta">
            {new Date(publicacion.fecha_creacion).toLocaleString()}
          </p>
          <p className="publicacion-sobre">
            Publicación sobre:{" "}
            {publicacion.curso_nombre ||
              (publicacion.profesor_nombres
                ? `${publicacion.profesor_nombres} ${publicacion.profesor_apellidos}`
                : "General")}
          </p>
          <p>{publicacion.mensaje}</p>
        </div>

        <h3>Agregar comentario</h3>
        <form className="comentario-form" onSubmit={handleSubmit}>
          <textarea
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            rows={3}
            placeholder="Escribe tu comentario..."
          />
          <button type="submit">Comentar</button>
        </form>
      </div>
    </div>
  );
};

export default Comentarios;
