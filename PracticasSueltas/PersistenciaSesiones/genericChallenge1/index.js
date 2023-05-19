/*
Realizar un programa de backend que establezca sesiones de usuarios en el servidor.
Cuando un cliente visita el sitio por primera vez en la ruta 'root', se presentará el mensaje de
“Te damos la bienvenida”. 
Con los siguientes request de ese mismo usuario, deberá aparecer el número de visitas efectuadas.
El cliente podrá ingresar por query params el nombre, en cuyo caso se añadirá a los mensajes devuelto.
Por ejemplo: “Bienvenido Juan” o “Juan visitaste la página 3 veces”. Ese nombre sólo se almacenará
la primera vez que el cliente visite el sitio.

Se dispondrá de una ruta 'olvidar' que permita reiniciar el proceso de visitas para el usuario.

Modificar el resultado del desafío de session de la clase anterior para que almacene las
sesiones de usuario en el file system; en vez de que su persistencia sea en la memoria del servidor.
La carpeta destino será 'sesiones' y estará creada en el directorio anterior al proyecto.
Verificar que con las distintas sesiones de usuario se crean archivos dentro de esa carpeta, cuyos nombres corresponden a las cookies de sesión activas.
Fijar la duración del tiempo de vida de la sesión y de su cookie de 1 minuto. 
Analizar los resultados.

*/

const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const app = express();

app.use(session({
  store: new FileStore({ path: '../sesiones' }),
  cookie: {
    maxAge: 60000,
  },
  secret: 'my-super-secret',
  resave: true,
  saveUninitialized: true,
}));

app.get('/', (req, res) => {
  if (typeof req.session.count !== 'number') {
    req.session.name = req.query.name ?? '';
    req.session.count = 1;
    res.send(`Hola ${req.session.name}, te damos la bienvenida`);
  } else {
    req.session.count ++;
    res.send(`Hola ${req.session.name}, has visitado esta página ${req.session.count} veces`);
  }
});

app.get('/olvidar', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).send(`Something terrible just happened!!!`);
    } else {
      res.send('Adios');
    }
  })
});

app.listen(3000);
