const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');

class LoginController {
  async postAuthenticate(req, res, next) {
    try {
      //   Buscamos el usuario
      const { email, password } = req.body;
      const usuario = await Usuario.findOne({ email: email });

      if (!usuario) {
        res.json({ error: 'invalid credentials' });
      } else {
        // Token

        const token = await jwt.sign({ _id: usuario._id }, process.env.JWT_SECRET, {
          expiresIn: '2d',
        });

        res.json({ jwt: token });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = LoginController;
