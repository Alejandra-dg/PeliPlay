const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { DataTypes } = require('sequelize');
const sequelize = require('./config/database');

// Definición del Modelo de Género directamente en app.js para respetar la estructura de la Fase 1
const Genero = sequelize.define('Genero', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  estado: {
    type: DataTypes.STRING, // Sequelize maneja cadenas que mapean con 'estado_enum' en la base de datos
    defaultValue: 'Activo'
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'generos',
  timestamps: true,
  createdAt: 'fecha_creacion',
  updatedAt: 'fecha_actualizacion'
});

// Ruta inicial (GET /)
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API PeliPlay funcionando correctamente'
  });
});

// Ruta de estado de salud (GET /api/health)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API funcionando correctamente',
    status: 'OK'
  });
});

// Obtener todos los géneros (GET /api/generos)
app.get('/api/generos', async (req, res) => {
  try {
    const generos = await Genero.findAll();
    res.status(200).json({
      success: true,
      data: generos
    });
  } catch (error) {
    console.error('Error al obtener géneros:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener los géneros de la base de datos',
      error: error.message
    });
  }
});

// Registrar un nuevo género en la base de datos real (POST /api/generos)
app.post('/api/generos', async (req, res) => {
  const { nombre, descripcion, estado } = req.body || {};

  // Validación básica del lado del servidor
  if (!nombre) {
    return res.status(400).json({
      success: false,
      message: 'El campo "nombre" es obligatorio'
    });
  }

  try {
    // Registro e inserción real en PostgreSQL a través de Sequelize
    const nuevoGenero = await Genero.create({
      nombre,
      descripcion,
      estado: estado || 'Activo'
    });

    res.status(201).json({
      success: true,
      message: 'Género registrado en la base de datos correctamente',
      data: nuevoGenero
    });
  } catch (error) {
    console.error('Error al registrar género:', error);
    res.status(500).json({
      success: false,
      message: 'Error al registrar el género en la base de datos',
      error: error.message
    });
  }
});

// Actualizar un género existente en la base de datos (PUT /api/generos/:id)
app.put('/api/generos/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, estado } = req.body || {};

  // Validación básica del lado del servidor
  if (!nombre) {
    return res.status(400).json({
      success: false,
      message: 'El campo "nombre" es obligatorio'
    });
  }

  try {
    // Buscar el género por su clave primaria (ID)
    const genero = await Genero.findByPk(id);

    if (!genero) {
      return res.status(404).json({
        success: false,
        message: `El género con ID ${id} no existe en la base de datos`
      });
    }

    // Actualizar los campos del género
    genero.nombre = nombre;
    genero.descripcion = descripcion;
    if (estado) {
      genero.estado = estado;
    }

    // Guardar los cambios en PostgreSQL
    await genero.save();

    res.status(200).json({
      success: true,
      message: 'Género actualizado en la base de datos correctamente',
      data: genero
    });
  } catch (error) {
    console.error('Error al actualizar género:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar el género en la base de datos',
      error: error.message
    });
  }
});

// Eliminar un género existente de la base de datos (DELETE /api/generos/:id)
app.delete('/api/generos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar el género por su clave primaria (ID)
    const genero = await Genero.findByPk(id);

    if (!genero) {
      return res.status(404).json({
        success: false,
        message: `El género con ID ${id} no existe en la base de datos`
      });
    }

    // Eliminar el género de la base de datos PostgreSQL
    await genero.destroy();

    res.status(200).json({
      success: true,
      message: 'Género eliminado de la base de datos correctamente'
    });
  } catch (error) {
    console.error('Error al eliminar género:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar el género en la base de datos',
      error: error.message
    });
  }
});

module.exports = app;
