// Cargar las variables de entorno al inicio del todo
require('dotenv').config();

const app = require('./src/app');
const sequelize = require('./src/config/database');

const PORT = process.env.PORT || 3000;

/**
 * Función principal para iniciar la conexión a la base de datos y arrancar el servidor
 */
async function startServer() {
  try {
    // 1. Probar la autenticación y conexión con la base de datos PostgreSQL
    await sequelize.authenticate();
    console.log('Base de datos PostgreSQL conectada correctamente');

    // Sincronizar los modelos con la base de datos
    await sequelize.sync({ alter: true });
    console.log('Modelos de la base de datos sincronizados correctamente');

    // 2. Si la conexión es exitosa, iniciar el servidor Express para escuchar peticiones
    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
  } catch (error) {
    // 3. Si la conexión falla, se captura el error, se imprime en consola y se aborta el inicio del servidor
    console.error('Error al conectar con la base de datos PostgreSQL:');
    console.error(error.message || error);
    process.exit(1); // Terminamos la ejecución con error
  }
}

startServer();
