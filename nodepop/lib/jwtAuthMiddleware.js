const createHttpError = require('http-errors');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const palabraEliminar = 'Bearer ';
    let jwtToken = req.get('Authorization') || req.body.jwtToken || req.query.jwtToken;

    // Comprobamos que hay token
    if (!jwtToken) {
      const error = createHttpError(401, 'no token provided');
      next(error);
      return;
    }

    // Quitamos Bearer si lo contiene
    if (jwtToken.includes(palabraEliminar)) {
      jwtToken = jwtToken.replace(new RegExp(palabraEliminar, 'g'), '');
    }
    // Comprobamos el token
    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);
    next();
  } catch (error) {
    const errProcesado = createHttpError(401, error.message);
    next(errProcesado);
  }
};
