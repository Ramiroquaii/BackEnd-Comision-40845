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
    const child = fork(`${path.join(__dirname, `./calculoExterno.js`)}`);

    child.send(100000000);

    child.on('message', (message) => {
        res.send(message);
    });
});

randomApiRouter.get('/:number', async (req, res) => {
    const { number } = req.params; // n cantidad de numeros - especificado por parametro.
    const child = fork(`${path.join(__dirname, `./calculoExterno.js`)}`);

    child.send(number);

    child.on('message', (message) => {
        res.send(message);
    });
});

randomApiRouter.get('/info', async (req, res) => {
    const serverInfo = {
        key: "INFO",
        info: {
            'ID de Proceso': process.pid,
            'Path de Ejecucion': process.cwd(),
            'Nombre de Plataforma': process.platform,
            'Version de Node': process.version,
            'Uso de Memoria': process.memoryUsage(),
            'PUERTO Servidor': server.address().port
        }
    };
    
    child.on('message', (message) => {
        res.send(JSON.stringify(serverInfo));
    });
});


function isPortAvailable(port) {
    return new Promise((resolve) => {
        const server = net.createServer();
        server.once('error', () => {
            resolve(false);
        });
        server.once('listening', () => {
            server.close();
            resolve(true);
        });
        server.listen(port);
    });
}

let ClonePort1 = 8082;
let ClonePort2 = 8083;
let ClonePort3 = 8084;
let ClonePort4 = 8085;

isPortAvailable(ClonePort1).then((available) => {
    if (available) {
        console.log(`Port is available ${ClonePort1}`);
        // start your server on port here
        server.listen(ClonePort1, () => {
            console.log(`CLUSTER en puerto ${server.address().port} PID: ${process.pid}`);
        });
        server.on("error", error => { console.log(`Error lanzando en ${ClonePort1} - PID: ${process.pid}`); });
    } else {
        isPortAvailable(ClonePort2).then((available) => {
            if (available) {
                console.log(`Port is available ${ClonePort2}`);
                // start your server on port 3000 here
                server.listen(ClonePort2, () => {
                    console.log(`CLUSTER en puerto ${server.address().port} PID: ${process.pid}`);
                });
                server.on("error", error => { console.log(`Error lanzando en ${ClonePort2} - PID: ${process.pid}`); });
            } else {
                isPortAvailable(ClonePort3).then((available) => {
                    if (available) {
                        console.log(`Port is available ${ClonePort3}`);
                        // start your server on port 3000 here
                        server.listen(ClonePort3, () => {
                            console.log(`CLUSTER en puerto ${server.address().port} PID: ${process.pid}`);
                        });
                        server.on("error", error => { console.log(`Error lanzando en ${ClonePort3} - PID: ${process.pid}`); });
                    } else {
                        isPortAvailable(ClonePort4).then((available) => {
                            if (available) {
                                console.log(`Port is available ${ClonePort4}`);
                                // start your server on port 3000 here
                                server.listen(ClonePort4, () => {
                                    console.log(`CLUSTER en puerto ${server.address().port} PID: ${process.pid}`);
                                });
                                server.on("error", error => { console.log(`Error lanzando en ${ClonePort4} - PID: ${process.pid}`); });
                            }
                        });
                    }
                });
            }
        });
    }
});







