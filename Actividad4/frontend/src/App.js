import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/login';
import Register from './components/register';
import Inicio from './components/inicio';
import Perfil from './components/perfil';
import CrearPublicacion from './components/crearPublicacion';
import Comentarios from './components/crearComentario';
import RecuperarPassword from './components/recuperar';
import VerUsuario from './components/verUsuario';
import { AuthProvider } from './AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/crear-publicacion" element={<CrearPublicacion />} />
          <Route path="/comentarios/:id_publicacion" element={<Comentarios />} />
          <Route path="/recuperar" element={<RecuperarPassword />} />
          <Route path="/verUsuario/:id" element={<VerUsuario />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
