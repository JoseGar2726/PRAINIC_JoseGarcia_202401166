import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/login';
import Register from './components/register';
import Inicio from './components/inicio';
import Perfil from './components/perfil';
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
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
