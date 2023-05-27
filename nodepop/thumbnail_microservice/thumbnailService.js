'use strict';

// Microservicio para crear un thumnail
const { Responder } = require('cote');

const responder = new Responder({ name: 'servicio de thumbnail' });

responder.on('crear-thumbnail', (req, done) => {
  console.log(Date.now(), 'servicio:', req);
  done('respuesta de thumnailService.js, fichero: ' + req.fileName);
});
