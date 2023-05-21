const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Creamos el modelo
const Usuario = mongoose.model('Usuario', usuarioSchema);
// Exportamos el modelo
module.exports = Usuario;
