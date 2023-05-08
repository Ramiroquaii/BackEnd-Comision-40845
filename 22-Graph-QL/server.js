// LO QUE FALTA 
// Dividir en Capas        6-abr		Clase 38
// Testeando API	          25-abr	Clase 42
// Reformar para Framework	9-may	  Proxima Entrega	Clase 46
// Servidor Deno	          11-may	Ultima Clase	Clase 47


const { serverPort, serverMode, sessionSecret } = require('./environment.js');
const { logger } = require('./logs/log4jsConfig.js');
const path = require('path');  // Para el uso de rutas filePaths absolutos.

const express = require('express');
const { createServer } = require('http');
const socketIo = require('socket.io');
const expressSession = require('express-session');

const { productosApiRouter } = require('./api/productos.js');
const { mensajesApiRouter } = require('./api/mensajes.js');
const { userApiRouter } = require('./api/users.js');
const { randomApiRouter } = require('./api/randomNumbers.js');

const { productSocket } = require('./webSocket/productosWS.js');
const { messageSocket } = require('./webSocket/mensajesWS.js');

const { mainPage } = require('./pages/loadPages.js');

const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphQL/schema.js');


const app = express();
const server = createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(express.static(`${path.join(__dirname, `public`)}`));

function getContentType(ext) {
  switch (ext) {
    case 'css':
      return 'text/css';
    case 'js':
      return 'application/javascript';
    default:
      return 'text/html';
  }
}

app.use(express.static(`${path.join(__dirname, `public`)}`, {
  setHeaders: (res, path, stat) => {
    const fileExt = path.split('.').pop();
    const contentType = getContentType(fileExt);
    res.set('Content-Type', contentType);
  }
}));

app.use(expressSession({
  secret: sessionSecret,
  resave: true,
  saveUninitialized: true,
}));

app.use(productosApiRouter);
app.use(mensajesApiRouter);
app.use(userApiRouter);
app.use(randomApiRouter);


app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.get('/registro', (req, res) => {
  res.sendFile(path.join(__dirname, './public/registro.html'));
});

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
  logger.trace(`Client ${client.id} connected`);

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
  logger.trace(`Servidor http WebSocket en puerto ${server.address().port} - PID: ${process.pid}`);
});

server.on("error", error => {
    logger.trace(`Server cannot START - See log files for reason.`);
    logger.error(`Server cannot START - reason below:\n${error}`);
  }
);
