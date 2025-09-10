const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

//CONEXION A MYSQL
const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '1234',
    database: process.env.DB_NAME || 'practicas'
});

db.connect(err => {
    if(err) console.log('Error al conectar a MySQL: ', err);
    else console.log('Conectado a Mysql');
});


//ENDPOINT LOGIN
app .post('/api/login', (req,res) => {
    const { registroAcademico, passUser } = req.body;

    if (!registroAcademico || !passUser){
        return res.status(400).json({ message: 'Faltan Datos'});
    }

    const query = 'SELECT * FROM usuarios WHERE registro_academico = ? AND contrasena = ?';

    db.query(query, [registroAcademico, passUser], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: 'Error en la base de datos'});
        }
        if (results.length > 0) {
            return res.json({ message: 'Login exitoso', user: results[0] });
        } else {
            return res.status(401).json({ message: 'Registro Academico o Contraseña Incorrectos' });
        }
    });
});

//ENPOINT REGISTRARSE
app.post('/api/register', (req, res) => {
    const { registroAcademico, nombres, apellidos, correo, passUser } = req.body;
     console.log("Datos recibidos:", req.body);
    
    if (!registroAcademico || !nombres || !apellidos || !correo || !passUser) {
        return res.status(400).json({ message: 'Faltan datos' });
    }

    const checkQuery = 'SELECT * FROM usuarios WHERE registro_academico = ? OR correo = ?';
    db.query(checkQuery, [registroAcademico, correo], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: 'Error en la base de datos' });
        }
        if (results.length > 0) {
            return res.status(409).json({ message: 'El usuario o correo ya existe' });
        }

        const insertQuery = 'INSERT INTO usuarios (registro_academico, nombres, apellidos, correo, contrasena) VALUES (?, ?, ?, ?, ?)';
        db.query(insertQuery, [registroAcademico, nombres, apellidos, correo, passUser], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: 'No se pudo crear el usuario' });
            }
            return res.json({ message: 'Usuario creado correctamente' });
        });
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));