const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Genero = require('./generos');
const Director = require('./directores');
const Productora = require('./productoras');
const Tipo = require('./tipos');

const Media = sequelize.define('Media', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    serial: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sinopsis: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: true
    },
    anio_estreno: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    genero_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Genero,
            key: 'id'
        }
    },
    director_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Director,
            key: 'id'
        }
    },
    productora_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Productora,
            key: 'id'
        }
    },
    tipo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Tipo,
            key: 'id'
        }
    }
}, {
    tableName: 'media',
    timestamps: true,
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion'
});

// Definir asociaciones
Media.belongsTo(Genero, { foreignKey: 'genero_id', as: 'genero' });
Media.belongsTo(Director, { foreignKey: 'director_id', as: 'director' });
Media.belongsTo(Productora, { foreignKey: 'productora_id', as: 'productora' });
Media.belongsTo(Tipo, { foreignKey: 'tipo_id', as: 'tipo' });

Genero.hasMany(Media, { foreignKey: 'genero_id' });
Director.hasMany(Media, { foreignKey: 'director_id' });
Productora.hasMany(Media, { foreignKey: 'productora_id' });
Tipo.hasMany(Media, { foreignKey: 'tipo_id' });

module.exports = Media;
