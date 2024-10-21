// database.js
const mongoose = require('mongoose');

// Nombre de la base de datos
const dbName = 'automation'; // Cambia esto por el nombre deseado

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb://localhost:27017/${dbName}`);
    console.log(`Conectado a la base de datos: ${dbName}`);
  } catch (error) {
    console.error('Error al conectar a MongoDB', error);
    process.exit(1); // Salir del proceso si hay un error de conexión
  }
};

module.exports = connectDB;
