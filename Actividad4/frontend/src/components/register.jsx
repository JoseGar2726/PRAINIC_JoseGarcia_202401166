import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
              // Si el status no es 200, mostramos mensaje de error
              const text = await res.text(); // Leemos como texto por si es HTML de error
              console.error("Error del servidor:", text);
              alert("No se pudo registrar el usuario.");
              return;
          }
        
          const data = await res.json(); // Solo parseamos JSON si el status es OK
          alert(data.message); // Muestra mensaje enviado por el backend
        
          // Limpiar formulario si se registró correctamente
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
        <div style={{ maxWidth: "400px", margin: "50px auto" }}>
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
                <button type="submit" style={{ marginTop: "10px" }}>Registrar</button>
            </form>

            <p style={{ marginTop: "15px" }}>
                ¿Ya tienes cuenta? <Link to="/">Iniciar sesión</Link>
            </p>
        </div>
    );
};

export default Register;

