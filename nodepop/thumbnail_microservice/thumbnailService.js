'use strict';
require('dotenv').config();

// Microservicio para crear un thumnail
const { Responder } = require('cote');
const jimp = require('jimp');

const responder = new Responder({ name: 'servicio de thumbnail' });

responder.on('crear-thumbnail', async (req, done) => {
  const folderOrigin = process.env.FOLDER_UPLOADS_IMAGES;
  const folderDestination = process.env.FOLDER_THUMBNAILS;
  const fileName = req.fileName;
  // Read the image.
  const image = await jimp.read(folderOrigin + fileName);

  // Resize the image to width 150 and auto height.
  image.resize(100, 100);
  image.circle();

  // Save and overwrite the image
  await image.writeAsync(folderDestination + 'thumbnail_' + fileName);
  console.log('Thumbnail generado ' + req.fileName);
  done('Respuesta: thumbnail_' + req.fileName);
});
