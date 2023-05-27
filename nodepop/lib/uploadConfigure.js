const multer = require('multer');
const path = require('path');

// declaro una configuración de upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const ruta = path.join(__dirname, '..', 'public', 'data', 'uploads');
    cb(null, ruta);
  },
  filename: function (req, file, cb) {
    const fileParse = path.parse(file.originalname);
    const filename = file.fieldname + '_' + fileParse.name + '_' + Date.now() + fileParse.ext;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
