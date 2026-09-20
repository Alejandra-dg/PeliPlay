const { Sequelize } = require('sequelize');

let sequelize;

// Si existe la variable DATABASE_URL (usada por Render, Supabase, Neon o Railway), la utilizamos directamente
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Requerido para conexiones seguras SSL en entornos Cloud
      }
    }
  });
} else {
  // Conexión tradicional con variables individuales (desarrollo local o PostgreSQL tradicional)
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      dialect: 'postgres',
      logging: false,
      dialectOptions: (process.env.DB_SSL === 'true' || process.env.NODE_ENV === 'production') ? {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      } : {}
    }
  );
}

module.exports = sequelize;

