# PeliPlay-Backend - Fase 1

Este es el backend del proyecto académico **PeliPlay** para la Institución Universitaria Digital de Antioquia. En esta primera fase, se realiza la configuración inicial del entorno, dependencias y conexión a la base de datos PostgreSQL.

## Tecnologías Utilizadas

* **Node.js** & **Express.js**: Framework para la construcción de la API REST.
* **PostgreSQL**: Base de datos relacional.
* **Sequelize**: ORM para interactuar con la base de datos.
* **dotenv**: Gestión de variables de entorno.
* **cors**: Middleware para habilitar el intercambio de recursos de origen cruzado (CORS).
* **nodemon**: Herramienta de desarrollo que reinicia automáticamente el servidor al detectar cambios.

---

## Requisitos Previos

1. Tener instalado **Node.js** (versión 16 o superior).
2. Tener instalado y en ejecución un servidor de **PostgreSQL**.
3. Contar con una base de datos creada llamada `peliplay`.

---

## Configuración del Proyecto

1. Clona o abre la carpeta en tu entorno local.
2. Instala las dependencias del proyecto:
   ```bash
   npm install
   ```
3. Duplica el archivo `.env.example`, renombralo a `.env` y edita la contraseña de PostgreSQL:
   ```env
   DB_PASSWORD=tu_contraseña_real
   ```

---

## Ejecución del Servidor

* **Modo de Producción**:
  ```bash
  npm start
  ```

* **Modo de Desarrollo (con Nodemon)**:
  ```bash
  npm run dev
  ```

Al iniciar correctamente, deberás ver los siguientes mensajes en la consola:
```text
Base de datos PostgreSQL conectada correctamente
Servidor ejecutándose en http://localhost:3000
```

---

## Endpoints de Verificación

* **Ruta de bienvenida**: `GET http://localhost:3000/`
* **Ruta de estado (Health Check)**: `GET http://localhost:3000/api/health`
