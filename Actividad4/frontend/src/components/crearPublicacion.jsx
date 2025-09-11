import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/crearPublicacion.css";

const CrearPublicacion = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState("");
  const [tipo, setTipo] = useState("curso");
  const [cursos, setCursos] = useState([]);
  const [profesores, setProfesores] = useState([]);
  const [idSeleccionado, setIdSeleccionado] = useState("");

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const resCursos = await fetch("http://localhost:3001/api/cursos");
        const dataCursos = await resCursos.json();
        setCursos(dataCursos);

        const resProfesores = await fetch("http://localhost:3001/api/profesores");
        const dataProfesores = await resProfesores.json();
        setProfesores(dataProfesores);
      } catch (error) {
        console.log("Error al traer cursos/profesores:", error);
      }
    };
    fetchDatos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mensaje) return alert("Escribe un mensaje");
    if (!idSeleccionado) return alert("Selecciona un curso o profesor");

    const body = {
      id_usuario: user.id_usuario,
      mensaje,
      id_curso: tipo === "curso" ? idSeleccionado : null,
      id_profesor: tipo === "profesor" ? idSeleccionado : null,
    };

    try {
      const response = await fetch("http://localhost:3001/api/publicaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Publicación creada!");
        navigate("/inicio");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log("Error al crear publicación:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="crear-container">
        <h2>Crear Publicación</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Tipo:
            <select value={tipo} onChange={(e) => {setTipo(e.target.value); setIdSeleccionado("");}}>
              <option value="curso">Curso</option>
              <option value="profesor">Profesor</option>
            </select>
          </label>

          <label>
            {tipo === "curso" ? "Curso:" : "Profesor:"}
            <select value={idSeleccionado} onChange={(e) => setIdSeleccionado(e.target.value)}>
              <option value="">--Selecciona--</option>
              {tipo === "curso"
                ? cursos.map((c) => <option key={c.id_curso} value={c.id_curso}>{c.nombre_curso}</option>)
                : profesores.map((p) => <option key={p.id_profesor} value={p.id_profesor}>{p.nombres} {p.apellidos}</option>)
              }
            </select>
          </label>

          <label>
            Mensaje:
            <textarea value={mensaje} onChange={(e) => setMensaje(e.target.value)} />
          </label>

          <button type="submit">Publicar</button>
        </form>
      </div>
    </>
  );
};

export default CrearPublicacion;
