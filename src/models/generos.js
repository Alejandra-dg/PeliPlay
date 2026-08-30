const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

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

module.exports = Genero;