const { serverPort, serverMode, sessionSecret } = require('./environment.js');
const cluster = require('cluster');
const numCPUs = 4; //require('os').cpus().length; Forzar solamente a 4 procesos para evaluar rendimiento no sobrescalado en caso de contar con mas de 4 CPUs.

const net = require('net');

const { fork } = require('child_process');

const initialClusterPort = 8082;
const maxClusterPort = 8085;
let clusterPort = initialClusterPort;

function findAvailablePort(ports, callback) {
  let portIndex = 0;
  function tryPort() {
    if (portIndex >= ports.length) {
      callback(new Error('No available ports found'));
      return;
    }
    const port = ports[portIndex];
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => {
        callback(null, port);
      });
    });
    server.on('error', () => {
      portIndex++;
      tryPort();
    });
  }
  tryPort();
}

if (cluster.isPrimary) {
  console.log(`Process: ${process.pid} runnig MAIN PROCESS Server Handler.`);

  if (serverMode == 'cluster') {
    console.log(`Server MODE: ${serverMode}`);

    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on('message', (worker, message) => {
      let options = JSON.parse(message);
      if (options.key == "READY") {
        worker.send(JSON.stringify({ key:"START", port: clusterPort }));
        if (clusterPort < maxClusterPort) {
          clusterPort++;
        } else { clusterPort = initialClusterPort; }
      }
      if (options.key == "ERROR") {
        const portsToTry = [8082, 8083, 8084, 8085];
        findAvailablePort(portsToTry, (err, port) => {
          if (err) {
            console.log("Awaiting FREE port in range to reconnect in 10sec ...");
            setTimeout( ()=>{worker.send(JSON.stringify({ key: "RETRY" }))}, 10000);
          } else {
            worker.send(JSON.stringify({ key: "START", port: port }));
          }
        });
      }
    });

    // Keep always alive.
    cluster.on('exit', (worker, code, signal) => {
      console.log(`Process ${worker.process.pid} DIE.`);
      cluster.fork();
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

  app.get('/registro', (req, res) => {
    res.sendFile( path.join(__dirname, './pages/registro.html') );
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
    console.log(`Servidor http WebSocket en puerto ${server.address().port} - PID: ${process.pid}`);
  });
  server.on("error", error => console.log(`Error en servidor ${error}`));

  // Else for workers lunches in cluster *************************************************** //

  // *************************************************************************************** //

} else {
  // This is a worker process - Your server code goes here

  const express = require('express'); // Modulo para crear servidor.
  const Router = require('express');
  const { createServer } = require('http');
  const { fork } = require('child_process');

  const net = require('net');

  const path = require('path');  // Para el uso de rutas filePaths absolutos.

  const randomApiRouter = new Router();

  const app = express();              // Instanciacion del servidor.
  const server = createServer(app);

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/api/randomNumbers', randomApiRouter);

  randomApiRouter.get('/', async (req, res) => {
    // default 100.000.000 números - no se especifica cantidad.
    const child = fork(`${path.join(__dirname, `./fork/calculoExterno.js`)}`);

    child.send(100000000);

    child.on('message', (message) => {
      res.send(message);
    });
  });

  randomApiRouter.get('/:number', async (req, res) => {
    const { number } = req.params; // n cantidad de numeros - especificado por parametro.
    const child = fork(`${path.join(__dirname, `./fork/calculoExterno.js`)}`);

    child.send(number);

    child.on('message', (message) => {
      res.send(message);
    });
  });

  app.get('/infoCluster', async (req, res) => {
    const serverInfo = {
      'ID de Proceso': process.pid,
      'Path de Ejecucion': process.cwd(),
      'Nombre de Plataforma': process.platform,
      'Version de Node': process.version,
      'Uso de Memoria': process.memoryUsage(),
      'PUERTO Servidor': server.address().port
    };
    res.send(serverInfo);
  });


  process.send(JSON.stringify({ key: 'READY' }));

  process.on('message', (message) => {
    let options = JSON.parse(message);

    if(options.key == "INFO"){
      process.send(JSON.stringify({ key: 'ERROR' }))
    }

    if(options.key == "RETRY"){
      process.send(JSON.stringify({ key: 'ERROR' }))
    }

    if(options.key == "START"){
      server.listen(options.port, () => {
        console.log(`Servidor CLUSTER en puerto ${options.port} - PID: ${process.pid} - Parent: ${process.ppid}`);
      });
      server.on("error", error => process.send(JSON.stringify({ key: 'ERROR' })));
    }
  });

  console.log(`Child process generado: ${process.pid} desde cluster...`);
}








// Enlace Workshop Mongo Atlas
// https://www.atlas-google-cloud-workshop.com/docs/intro

// Paquete APOLO SERVER - APOLO CLIENT -> DESAROLLAR GraphQL Querys



