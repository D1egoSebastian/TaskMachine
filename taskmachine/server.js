const config = require('./config.js');
const express = require('express');
const connection = require('./database.js');
const {generateToken, verifyToken} = require('./auth.js');
const app = express();

console.log(`NODE_ENV=${config.NODE_ENV}`);

app.use(express.json());

// Define una ruta de autenticacion
app.post('/login', (req, res) => {
  const {username, password} = req.body;
  if (username === 'admin' && password === 'password') {
    const token = generateToken({username});
    res.json({token});
  } else {
    res.status(401).send('Invalid credentials');
  }
});

app.use((req, res, next) => {
  const token = req.headers['authorization'];
  if (token) {
    const decoded = verifyToken(token);
    if (decoded) {
      req.user = decoded;
      next();
    } else {
      res.status(401).send('Invalid token');
    }
  } else {
    res.status(401).send('No token provided');
  }
});
// Define una ruta básica
app.get('/', (req, res) => {
  res.send('Hello world');
});

// Inicia el servidor
app.listen(config.PORT, config.HOST, function () {
  console.log(`App listening on http://${config.HOST}:${config.PORT}`);
});

