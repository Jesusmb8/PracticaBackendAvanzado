'use strict';

const Anuncio = require('../models/Anuncio');
const Usuario = require('../models/Usuario');
const connection = require('../lib/connectMongoose');
const fs = require('fs');

main().catch((err) => {
  console.log('Hubo un error', err);
  connection.close();
});

async function main() {
  // inicializamos colección de agentes
  await inicializarAnuncios();
  await inicializarUsuarios();

  connection.close();
}

async function inicializarAnuncios() {
  const data2load = JSON.parse(fs.readFileSync('./bin/anuncios.json', 'utf-8'));

  // borrar todos los documentos de la colección de agentes
  const deleted = await Anuncio.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} anuncios.`);

  for (const anuncio of data2load.anuncios) {
    await Anuncio.create(anuncio);
  }

  console.log(`Creados ${data2load.anuncios.length} anuncios`);
}

async function inicializarUsuarios() {
  await Usuario.create({ email: 'user@example.com', password: '1234' });
  console.log(`Usuarios de prueba creados`);
}
