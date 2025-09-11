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

// ENDPOINT PARA OBTENER PUBLICACIONES
app.get('/api/publicaciones', (req, res) => {
    const query = `
        SELECT 
            p.id_publicacion, 
            p.mensaje, 
            p.fecha_creacion,
            u.nombres AS usuario_nombres, 
            u.apellidos AS usuario_apellidos, 
            u.registro_academico,
            u.correo AS usuario_correo,
            c.nombre_curso AS curso_nombre,
            pr.nombres AS profesor_nombres,
            pr.apellidos AS profesor_apellidos
        FROM publicaciones p
        JOIN usuarios u ON p.id_usuario = u.id_usuario
        LEFT JOIN cursos c ON p.id_curso = c.id_curso
        LEFT JOIN profesores pr ON p.id_profesor = pr.id_profesor
        ORDER BY p.fecha_creacion DESC;
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error("Error en la consulta:", err);
            return res.status(500).json({ message: 'Error al obtener publicaciones', error: err });
        }

        res.json(Array.isArray(results) ? results : []);
    });
});

//ENDPOINT PARA CREAR PUBLICACION
app.post('/api/publicaciones', (req, res) => {
  const { id_usuario, mensaje, id_curso, id_profesor } = req.body;

  if (!id_usuario || !mensaje) {
    return res.status(400).json({ message: 'Faltan datos para la publicación' });
  }

  const query = 'INSERT INTO publicaciones (id_usuario, mensaje, id_curso, id_profesor, fecha_creacion) VALUES (?, ?, ?, ?, NOW())';
  db.query(query, [id_usuario, mensaje, id_curso || null, id_profesor || null], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'No se pudo crear la publicación' });
    }
    res.json({ message: 'Publicación creada correctamente' });
  });
});

// Obtener cursos
app.get('/api/cursos', (req, res) => {
  db.query('SELECT id_curso, nombre_curso FROM cursos', (err, results) => {
    if(err) return res.status(500).json({message: 'Error al obtener cursos'});
    res.json(results);
  });
});

// Obtener profesores
app.get('/api/profesores', (req, res) => {
  db.query('SELECT id_profesor, nombres, apellidos FROM profesores', (err, results) => {
    if(err) return res.status(500).json({message: 'Error al obtener profesores'});
    res.json(results);
  });
});

//ENDPOINT OBTENER PUBLICACION ESPECIFICA - PARA COMENTARIOS
app.get('/api/publicaciones/:id', (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT 
      p.id_publicacion, p.mensaje, p.fecha_creacion,
      u.nombres AS usuario_nombres,
      u.apellidos AS usuario_apellidos,
      u.correo AS usuario_correo,
      c.nombre_curso AS curso_nombre,
      pr.nombres AS profesor_nombres,
      pr.apellidos AS profesor_apellidos
    FROM publicaciones p
    JOIN usuarios u ON p.id_usuario = u.id_usuario
    LEFT JOIN cursos c ON p.id_curso = c.id_curso
    LEFT JOIN profesores pr ON p.id_profesor = pr.id_profesor
    WHERE p.id_publicacion = ?
  `;

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error al obtener publicación:", err);
      return res.status(500).json({ message: "Error al obtener publicación" });
    }
    if (results.length === 0) return res.status(404).json({ message: "Publicación no encontrada" });
    res.json(results[0]);
  });
});

//ENDPOINT PARA CREAR COMENTARIO
app.post('/api/comentarios', (req, res) => {
    const { id_publicacion, id_usuario, mensaje } = req.body;

    if (!id_publicacion || !id_usuario || !mensaje) {
        return res.status(400).json({ message: 'Faltan datos para el comentario' });
    }

    const query = `
        INSERT INTO comentarios (id_publicacion, id_usuario, mensaje, fecha_creacion)
        VALUES (?, ?, ?, NOW())
    `;

    db.query(query, [id_publicacion, id_usuario, mensaje], (err, result) => {
        if (err) {
            console.error("Error al crear comentario:", err);
            return res.status(500).json({ message: 'No se pudo crear el comentario' });
        }

        res.json({ message: 'Comentario creado correctamente' });
    });
});


// Obtener comentarios de una publicación
app.get('/api/comentarios/:id_publicacion', (req, res) => {
    const { id_publicacion } = req.params;

    const query = `
        SELECT c.id_comentario, c.id_publicacion, c.id_usuario, c.mensaje, c.fecha_creacion,
               u.nombres AS usuario_nombres,
               u.apellidos AS usuario_apellidos,
               u.correo AS usuario_correo
        FROM comentarios c
        JOIN usuarios u ON c.id_usuario = u.id_usuario
        WHERE c.id_publicacion = ?
        ORDER BY c.fecha_creacion ASC
    `;

    db.query(query, [id_publicacion], (err, results) => {
        if (err) {
            console.error("Error al obtener comentarios:", err);
            return res.status(500).json({ message: "Error al obtener comentarios" });
        }

        res.json(results);
    });
});

//RECUPERAR CONTRASEÑA
app.post('/api/recuperar-password', (req, res) => {
    const { registroAcademico, correo, nuevaPassword } = req.body;

    if (!registroAcademico || !correo || !nuevaPassword) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const verificarQuery = `
        SELECT * FROM usuarios
        WHERE registro_academico = ? AND correo = ?
    `;

    db.query(verificarQuery, [registroAcademico, correo], (err, results) => {
        if (err) {
            console.error("Error al buscar usuario:", err);
            return res.status(500).json({ message: "Error al buscar usuario" });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const actualizarQuery = `
            UPDATE usuarios
            SET contrasena = ?
            WHERE registro_academico = ? AND correo = ?
        `;

        db.query(actualizarQuery, [nuevaPassword, registroAcademico, correo], (err2, results2) => {
            if (err2) {
                console.error("Error al actualizar contraseña:", err2);
                return res.status(500).json({ message: "Error al actualizar contraseña" });
            }

            res.json({ message: "Contraseña actualizada correctamente" });
        });
    });
});

//ACTUALIZAR PERFIL
app.put('/api/actualizar-perfil', (req, res) => {
    const { registroAcademico, nombres, apellidos, correo } = req.body;

    if (!registroAcademico || !nombres || !apellidos || !correo) {
        return res.status(400).json({ message: "Todos los campos obligatorios" });
    }

    const verificarQuery = `
        SELECT * FROM usuarios
        WHERE registro_academico = ?
    `;

    db.query(verificarQuery, [registroAcademico], (err, results) => {
        if (err) {
            console.error("Error al buscar usuario:", err);
            return res.status(500).json({ message: "Error al buscar usuario" });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const actualizarQuery = `
            UPDATE usuarios
            SET nombres = ?, apellidos = ?, correo = ?
            WHERE registro_academico = ?
        `;

        db.query(actualizarQuery, [nombres, apellidos, correo || null, registroAcademico], (err2, results2) => {
            if (err2) {
                console.error("Error al actualizar perfil:", err2);
                return res.status(500).json({ message: "Error al actualizar perfil" });
            }

            res.json({ message: "Perfil actualizado correctamente" });
        });
    });
});

//BUSCAR USUARIO
app.get('/api/usuarios/:registroAcademico', (req, res) => {
    const { registroAcademico } = req.params;

    const query = `
        SELECT id_usuario, registro_academico, nombres, apellidos, correo
        FROM usuarios
        WHERE registro_academico = ?
    `;

    db.query(query, [registroAcademico], (err, results) => {
        if (err) {
            console.error("Error al buscar usuario:", err);
            return res.status(500).json({ message: "Error al buscar usuario" });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "Usuario no registrado" });
        }

        res.json(results[0]);
    });
});

//Buscar Usuario por id
app.get('/api/usuarios/id/:id', (req, res) => {
    const { id } = req.params;

    const query = `
        SELECT id_usuario, registro_academico, nombres, apellidos, correo
        FROM usuarios
        WHERE id_usuario = ?
    `;

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error("Error al buscar usuario por ID:", err);
            return res.status(500).json({ message: "Error al buscar usuario" });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json(results[0]);
    });
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));