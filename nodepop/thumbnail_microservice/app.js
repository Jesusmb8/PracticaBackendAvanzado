'use strict';

const { Requester } = require('cote');

const requester = new Requester({ name: 'aplicación' });

const evento = {
  type: 'crear-thumbnail',
  param1: 111,
};

setInterval(() => {
  requester.send(evento, (resultado) => {
    console.log(Date.now(), 'app obtiene resultado:', resultado);
  });
}, 1000);
