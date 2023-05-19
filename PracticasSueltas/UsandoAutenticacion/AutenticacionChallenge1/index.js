/*
Basado en un proyecto express que almacene sesiones de usuario, realizar un sistema que:
1) Tenga una vista de registro de usuario (nombre, password y dirección) que almacene dicha 
información en un array en memoria.
2) Posea un formulario de login (nombre y password) para permitir a los usuarios registrados 
acceder a su información.
3) Si accede un usuario no registrado o las credenciales son incorrectas, el servidor enviará 
un error (puede ser a través de un objeto plano o de una plantilla).
4) Si se quiere registrar un usuario que ya está registrado, el servidor enviará un error 
(puede ser a través de un objeto plano o de una plantilla).

5) En el caso de que sea válido el login, se iniciará una sesión de usuario y se mostrarán
los datos completos del usuario en una ruta específica (/datos).
👉 Se puede mostrar la información a través de un objeto plano o de una plantilla.
6) Implementar el cierre de sesión en una ruta '/logout' que puede llamar desde la barra de
dirección del browser, o desde un botón en la misma plantilla de datos.
7) Esa ruta '/datos' sólo estará disponible en caso de estar en una sesión de usuario activa.
caso contrario, se redireccionará a la vista de login.
8) Como extra podemos implementar un contador de visitas, que se muestre sobre la vista de datos.

*/

const express = require('express');
const session = require('express-session');

const app = express();
app.use(session({ secret: 'secreto' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const users = [];

app.post('/signup', (req, res) => {
  const { name, password } = req.body;

  const existentUser = users.find(user => user.name === name);
  if (existentUser) {
    res.status(403).send('El usuario ya existe');
    return;
  }

  users.push({ name, password });
  req.session.name = name;

  res.redirect('/datos');
});

app.post('/login', (req, res) => {
  const { name, password } = req.body;

  // Tenemos que verificar si las credenciales del usuario son válidas
  const user = users.find(user => user.name === name && user.password === password);
  if (!user) {
    res.status(403).send('Datos inválidos');
    return;
  }

  req.session.name = name;
  res.redirect('/datos');
});

const foo = (req, res) => res.send('FOO HERE!');
app.get('/endpoint', foo);

app.get('/datos', (req, res) => {
  if (req.session.name) {
    req.session.counter = (req.session.counter ?? 0) + 1;
    res.send(`Hola ${req.session.name}! Bienvenido. Has entrado ${req.session.counter} veces`);
    return;
  }

  res.redirect('/login.html');
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.send('Adios! Y si te he visto no me acuerdo');
  });
});

app.listen(3000, () => console.log('Ready!'));
