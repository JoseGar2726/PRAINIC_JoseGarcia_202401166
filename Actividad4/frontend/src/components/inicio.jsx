import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/inicio.css";

const Inicio = () => {
  const { user } = useAuth();
  const [publicaciones, setPublicaciones] = useState([]);
  const [comentarios, setComentarios] = useState({});
  const [filtro, setFiltro] = useState("todos");
  const [busqueda, setBusqueda] = useState("");
  const [publicacionesFiltradas, setPublicacionesFiltradas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPublicaciones = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/publicaciones");
        const data = await response.json();
        setPublicaciones(data);
        setPublicacionesFiltradas(data);

        data.forEach(async (pub) => {
          try {
            const res = await fetch(`http://localhost:3001/api/comentarios/${pub.id_publicacion}`);
            const coms = await res.json();
            setComentarios((prev) => ({ ...prev, [pub.id_publicacion]: coms }));
          } catch (err) {
            console.error(`Error al obtener comentarios de la publicación ${pub.id_publicacion}:`, err);
          }
        });
      } catch (error) {
        console.error("Error al obtener publicaciones:", error);
      }
    };

    fetchPublicaciones();
  }, []);

  const aplicarFiltro = () => {
    let filtradas = [...publicaciones];

    if (filtro === "cursos") {
      filtradas.sort((a, b) => (a.curso_nombre ? -1 : 1));
    } else if (filtro === "profesores") {
      filtradas.sort((a, b) => (a.profesor_nombres ? -1 : 1));
    } else if (filtro === "palabra" && busqueda.trim() !== "") {
      filtradas.sort((a, b) => {
        const matchA =
          (a.curso_nombre && a.curso_nombre.toLowerCase().includes(busqueda.toLowerCase())) ||
          (a.profesor_nombres &&
            `${a.profesor_nombres} ${a.profesor_apellidos}`
              .toLowerCase()
              .includes(busqueda.toLowerCase()));
        const matchB =
          (b.curso_nombre && b.curso_nombre.toLowerCase().includes(busqueda.toLowerCase())) ||
          (b.profesor_nombres &&
            `${b.profesor_nombres} ${b.profesor_apellidos}`
              .toLowerCase()
              .includes(busqueda.toLowerCase()));
        return matchA === matchB ? 0 : matchA ? -1 : 1;
      });
    }

    setPublicacionesFiltradas(filtradas);
  };

  return (
    <div className="inicio-container">
      <Navbar />
      <h1 className="inicio-titulo">Página de inicio</h1>

      {/* FILTROS */}
      <div className="filtros-container">
        <button
          className={`filtro-btn ${filtro === "cursos" ? "active" : ""}`}
          onClick={() => { setFiltro("cursos"); aplicarFiltro(); }}
        >
          Filtrar por cursos
        </button>
        <button
          className={`filtro-btn ${filtro === "profesores" ? "active" : ""}`}
          onClick={() => { setFiltro("profesores"); aplicarFiltro(); }}
        >
          Filtrar por profesores
        </button>
        <button
          className={`filtro-btn ${filtro === "palabra" ? "active" : ""}`}
          onClick={() => setFiltro("palabra")}
        >
          Filtrar por palabra
        </button>

        {filtro === "palabra" && (
          <>
            <input
              type="text"
              placeholder="Ingrese palabra..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="filtro-input"
            />
            <button className="filtro-aplicar" onClick={aplicarFiltro}>
              Aplicar filtro
            </button>
          </>
        )}
      </div>

      {user && <p>Bienvenido, {user.nombres} {user.apellidos}</p>}

      {publicacionesFiltradas.length === 0 ? (
        <p>No hay publicaciones</p>
      ) : (
        publicacionesFiltradas.map((pub) => (
          <div
            key={pub.id_publicacion}
            className="publicacion-card"
            onClick={() => navigate(`/comentarios/${pub.id_publicacion}`)}
          >
            <p className="publicacion-header">
              <b>{pub.usuario_nombres} {pub.usuario_apellidos}</b> ({pub.usuario_correo}) -{" "}
              {new Date(pub.fecha_creacion).toLocaleString()}
            </p>
            <p>
              <i>
                Publicación sobre:{" "}
                {pub.curso_nombre ||
                  (pub.profesor_nombres
                    ? `${pub.profesor_nombres} ${pub.profesor_apellidos}`
                    : "General")}
              </i>
            </p>
            <p className="publicacion-mensaje">{pub.mensaje}</p>

            <div className="comentarios-container">
              <h4>Comentarios:</h4>
              {comentarios[pub.id_publicacion]?.length === 0 ? (
                <p>No hay comentarios</p>
              ) : (
                comentarios[pub.id_publicacion]?.map((c) => (
                  <div key={c.id_comentario} className="comentario-item">
                    <b>{c.usuario_nombres} {c.usuario_apellidos}</b> ({c.usuario_correo}): {c.mensaje}
                  </div>
                ))
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Inicio;
