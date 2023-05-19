/*
Realizar el lo visto en el anterior segmento, en esta ocasión utilizando passport con
LocalStrategy para realizar todas las funciones que se piden.

No hace falta encriptar las contraseñas ni usar base de datos, todo puede residir
en memoria del servidor: usuarios y sesiones.
*/

const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('./config/auth');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

app.post(
  '/signup',
  passport.authenticate('signup', { failureRedirect: '/login.html' }),
  (req, res) => {
  req.session.username = req.user.username;
  res.redirect('/datos');
});

app.post(
  '/login',
  passport.authenticate('login', { failureRedirect: '/login.html' }),
  (req, res) => {
    req.session.username = req.user.username;
    res.redirect('/datos');
  },
);

app.get('/datos', (req, res) => {
  if (req.session.username) {
    req.session.counter = (req.session.counter ?? 0) + 1;
    res.send(`Bienvenido ${req.session.username}! Has visitado la página ${req.session.counter} veces`);
  } else {
    res.redirect('/login.html');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).send(`Failed to logout`);
    } else {
      res.redirect('/login.html');
    }
  })
});

app.listen(3000, () => console.log('Ready!'));

