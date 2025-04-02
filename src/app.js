const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

dotenv.config({ path: '../.env' }); // Cargar el archivo .env

if (!process.env.PORT) {
  console.error('No se encontró el archivo .env');
  process.exit(1);
}

const app = express();

app.set('port', process.env.PORT);

// Middlewares generales
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Servir archivos estáticos (CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Servir archivo CSS
app.use('/styles', express.static(path.join(__dirname, 'styles.css')));

const api = '/api/v1';

// Rutas
app.use(api, require('./routes/inv-investments-router'));

mongoose.connect(process.env.CONNECTION_STRING, {
  dbName: process.env.DATABASE,
  user: process.env.DB_USER,
  pass: process.env.DB_PASSWORD
})
  .then(() => console.log('Conectado a la base de datos'))
  .catch((err) => console.error('Error al conectar a la base de datos:', err));

// Información general del proyecto
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>RESTful API</title>
        <link rel="stylesheet" href="/styles/styles.css">
      </head>
      <body>
        <div class="container">
          <div class="titulo">RESTful API</div>
          <div class="librerias">
            <h2>Librerías utilizadas:</h2>
            <ul>
              <li>📚 Express.js</li>
              <li>📚 Morgan</li>
              <li>📚 Cors</li>
              <li>📚 Dotenv</li>
              <li>📚 Mongoose</li>
            </ul>
          </div>
          <div class="rutas">
            <h2>Manejo de rutas:</h2>
            <ul>
              <li>📍 GET /api/v1/getall - Obtiene todos los precios históricos</li>
              <li>📍 POST /api/v1/addone - Agrega un nuevo precio histórico</li>
              <li>📍 PUT /api/v1/put/:id - Actualiza un precio histórico por ID</li>
              <li>📍 DELETE /api/v1/delete/:id - Elimina un precio histórico por ID</li>
            </ul>
          </div>
          <div class="parametros">
            <h2>Parámetros recibidos:</h2>
            <ul>
              <li>📝 ID (requerido) - ID del precio histórico</li>
              <li>📝 DATE (requerido) - Fecha del precio histórico</li>
              <li>📝 OPEN (requerido) - Precio de apertura del precio histórico</li>
              <li>📝 HIGH (requerido) - Precio más alto del precio histórico</li>
              <li>📝 LOW (requerido) - Precio más bajo del precio histórico</li>
              <li>📝 CLOSE (requerido) - Precio de cierre del precio histórico</li>
              <li>📝 VOLUME (requerido) - Volumen del precio histórico</li>
            </ul>
          </div>
        </div>
      </body>
    </html>
  `);
});

app.get('/api/v1', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>RESTful API</title>
        <link rel="stylesheet" href="/styles/styles.css">
      </head>
      <body>
        <div class="container">
          <div class="titulo">RESTful API</div>
          <div class="librerias">
            <h2>Librerías utilizadas:</h2>
            <ul>
              <li>📚 Express.js</li>
              <li>📚 Morgan</li>
              <li>📚 Cors</li>
              <li>📚 Dotenv</li>
              <li>📚 Mongoose</li>
            </ul>
          </div>
          <div class="rutas">
            <h2>Manejo de rutas:</h2>
            <ul>
              <li>📍 GET /api/v1/getall - Obtiene todos los precios históricos</li>
              <li>📍 POST /api/v1/addone - Agrega un nuevo precio histórico</li>
              <li>📍 PUT /api/v1/put/:id - Actualiza un precio histórico por ID</li>
              <li>📍 DELETE /api/v1/delete/:id - Elimina un precio histórico por ID</li>
            </ul>
          </div>
          <div class="parametros">
            <h2>Parámetros recibidos:</h2>
            <ul>
              <li>📝 ID (requerido) - ID del precio histórico</li>
              <li>📝 DATE (requerido) - Fecha del precio histórico</li>
              <li>📝 OPEN (requerido) - Precio de apertura del precio histórico</li>
              <li>📝 HIGH (requerido) - Precio más alto del precio histórico</li>
              <li>📝 LOW (requerido) - Precio más bajo del precio histórico</li>
              <li>📝 CLOSE (requerido) - Precio de cierre del precio histórico</li>
              <li>📝 VOLUME (requerido) - Volumen del precio histórico</li>
            </ul>
          </div>
        </div>
      </body>
    </html>
  `);
});

module.exports = app;