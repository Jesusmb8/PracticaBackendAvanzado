'use strict';

const { Requester } = require('cote');

const requester = new Requester({ name: 'thumbnailApp' });
console.log(' Levantanddo el microservicio, requester de thumnail');

const EVENT_TYPE = 'crear-thumbnail';

const thumbnailRequester = {
  requester,
  EVENT_TYPE,
};

module.exports = thumbnailRequester;
