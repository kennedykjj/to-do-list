const jwt = require('jsonwebtoken');

const SECRET_KEY = 'my_super_plus_mega_ultra_secret_key';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const generateToken = (user) => {
  return jwt.sign(user, SECRET_KEY, { expiresIn: '1h' }); // Token expira em 1 hora
};

module.exports = { authenticateToken, generateToken };
