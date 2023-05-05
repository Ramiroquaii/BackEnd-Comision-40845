const express = require('express');
const { createServer } = require('http');

const dotenv = require('dotenv');
const yargs = require('yargs');

dotenv.config();

const argv = yargs
    .option('serverPort', { alias: 'p', description: 'Port number to use for the server', type: 'number', default: 8080 })
    .help()
    .alias('help', 'h')
.argv;

const app = express();

const server = createServer(app);

//const PORT = parseInt(process.argv[2]) || 8080;

app.get('/datos', (req, res) => {
    console.log(`Puerto: ${server.address().port} -> FYM: ${Date.now()}`);
    res.send(`Servidor Express Nginx en PUERTO: ${server.address().port} - PID: ${process.pid}`);
});

server.listen(argv['serverPort'], () => console.log(`LISTO  Port: ${server.address().port} ocupado por Server !!`) );