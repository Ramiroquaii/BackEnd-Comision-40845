const { serverPort, serverMode, sessionSecret } = require('./environment.js');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const { fork } = require('child_process');

if (cluster.isPrimary) {
  console.log(`Process: ${process.pid} runnig MAIN Server.`);

  if (serverMode == 'cluster') {
    console.log(`Server MODE: ${serverMode}`);

    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
  
    // Keep always alive.
    cluster.on('exit', (worker, code, signal) => {
      console.log(`Process ${worker.process.pid} DIE.`);
      cluster.fork('./fork/serverApiRandomNumber.js');
      console.log(`Process regenerated ${process.pid} ...`);
    });
  }
  const express = require('express');
  const { createServer } = require('http');
  const socketIo = require('socket.io');
  const expressSession = require('express-session');
  


  const { productosApiRouter } = require('./api/productos.js');
  const { mensajesApiRouter } = require('./api/mensajes.js');
  const { userApiRouter } = require('./api/users.js');

  const { productSocket } = require('./webSocket/productosWS.js');
  const { messageSocket } = require('./webSocket/mensajesWS.js');

  const { mainPage } = require('./pages/loadPages.js');

  const path = require('path');  // Para el uso de rutas filePaths absolutos.

  const app = express();
  const server = createServer(app);
  const io = socketIo(server, { cors: { origin: "*" } });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(`${path.join(__dirname, `public`)}`));

  app.use(expressSession({
    secret: sessionSecret,
    resave: true,
    saveUninitialized: true,
  }));

  app.use(productosApiRouter);
  app.use(mensajesApiRouter);
  app.use(userApiRouter);

  if (serverMode == 'standAlone') {
    const { randomApiRouter } = require('./api/randomNumbers.js');
    app.use(randomApiRouter);
    console.log(`Server MODE: ${serverMode}`);
  }

  app.get('/quiensoy', (req, res) => {
    if (req.session.loguedUser) {
      res.send(`Usuario Logueado: ${req.session.loguedUser} !!!`);
    } else {
      res.send(`No se ha iniciado session aún !!!`);
    }
  });

  app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).send(`Something terrible just happened!!!`);
      } else {
        res.redirect('/');
      }
    })
  });
  
  app.get('/info', (req, res) => {
    const serverInfo = {
      'ID de Proceso': process.pid,
      'Puerto Servidor': server.address().port,
      'Path de Ejecucion': process.cwd(),
      'Nombre de Plataforma': process.platform,
      'Version de Node': process.version,
      'Uso de Memoria': process.memoryUsage()
    };
    res.json(serverInfo);
  });
  
  io.on('connection', async client => {
    console.log(`Client ${client.id} connected`);
  
    productSocket(client, io.sockets);
    messageSocket(client, io.sockets);
  
    client.on('login-user', data => {
      if (data.estado == 1) {
        const sendString = JSON.stringify({ user: data.usuario, html: mainPage });
        client.emit('reload', sendString);
      } else {
        client.emit('user-error', data.mensaje);
      }
    });
  });
  
  server.listen(serverPort, () => {
    console.log(`Servidor http WebSocket escuchando en el puerto ${server.address().port}`);
  });
  server.on("error", error => console.log(`Error en servidor ${error}`));
  
  // Else for workers lunches in cluster *************************************************** //

} else {
  // This is a worker process - Your server code goes here
  
  fork('./fork/serverApiRandomNumber.js');
  console.log(`Child process generado: ${process.pid} desde cluster...`);

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Process ${worker.process.pid} DIE.`);
    cluster.fork('./fork/serverApiRandomNumber.js');
    console.log(`Process regenerated ${process.pid} ...`);
  });
}








// Enlace Workshop Mongo Atlas
// https://www.atlas-google-cloud-workshop.com/docs/intro

// Paquete APOLO SERVER - APOLO CLIENT -> DESAROLLAR GraphQL Querys



