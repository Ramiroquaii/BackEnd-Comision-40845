/*
Realizar un programa de backend que establezca sesiones de usuarios en el servidor.
Cuando un cliente visita el sitio por primera vez en la ruta 'root', se presentará el mensaje de
“Te damos la bienvenida”. 
Con los siguientes request de ese mismo usuario, deberá aparecer el número de visitas efectuadas.
El cliente podrá ingresar por query params el nombre, en cuyo caso se añadirá a los mensajes devuelto.
Por ejemplo: “Bienvenido Juan” o “Juan visitaste la página 3 veces”. Ese nombre sólo se almacenará
la primera vez que el cliente visite el sitio.

Se dispondrá de una ruta 'olvidar' que permita reiniciar el proceso de visitas para el usuario.
*/

const express = require('express');
const session = require('express-session');
const redis = require('redis');

const client = redis.createClient({ url: 'redis://default:5kgBpgHsHBpz8YrRYnyRkQ1asnzbIijk@redis-10717.c10.us-east-1-4.ec2.cloud.redislabs.com:10717', legacyMode: true });
client.connect().catch(console.error);

const RedisStore = require('connect-redis')(session);

const app = express();

app.use(session({
  store: new RedisStore({ client }),
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
