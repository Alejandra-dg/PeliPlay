const { Sequelize } = require('sequelize');

// Instancia de Sequelize configurada con las variables de entorno
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false, // Desactivamos el registro de consultas SQL en la consola para mantenerla limpia
  }
);

module.exports = sequelize;
