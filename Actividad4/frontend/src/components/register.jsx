import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/register.css";

const Register = () => {
  const [registroAcademico, setRegistroAcademico] = useState('');
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [correo, setCorreo] = useState('');
  const [passUser, setPassUser] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registroAcademico, nombres, apellidos, correo, passUser })
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Error del servidor:", text);
        alert("No se pudo registrar el usuario.");
        return;
      }

      const data = await res.json();
      alert(data.message);

      if (data.success) {
        setRegistroAcademico('');
        setNombres('');
        setApellidos('');
        setCorreo('');
        setPassUser('');
      }

    } catch (error) {
      console.error("Error al registrar usuario:", error);
      alert("Ocurrió un error al conectar con el servidor.");
    }
  };

  return (
    <div className="register-container">
      <h2>Registrar Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Registro Académico:</label>
          <input 
            type="text" 
            value={registroAcademico} 
            onChange={e => setRegistroAcademico(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Nombres:</label>
          <input 
            type="text" 
            value={nombres} 
            onChange={e => setNombres(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Apellidos:</label>
          <input 
            type="text" 
            value={apellidos} 
            onChange={e => setApellidos(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Correo:</label>
          <input 
            type="email" 
            value={correo} 
            onChange={e => setCorreo(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input 
            type="password" 
            value={passUser} 
            onChange={e => setPassUser(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Registrar</button>
      </form>

      <p>
        ¿Ya tienes cuenta? <Link to="/">Iniciar sesión</Link>
      </p>
    </div>
  );
};

export default Register;
