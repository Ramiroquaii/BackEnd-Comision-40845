const Router = require('express');
const randomApiRouter = new Router();

const path = require ('path');  // Para el uso de rutas filePaths absolutos.

const { fork } = require('child_process');


randomApiRouter.get('/api/randoms', async (req, res) => {
    // default 100.000.000 números - no se especifica cantidad.
    const child = fork(`${path.join(__dirname, `../fork/calculoExterno.js`)}`);

    child.send(100000000);

    child.on('message', (message) => {
        res.send(message);
    });
});

randomApiRouter.get('/api/randoms/:number', async (req, res) => {
    const { number } = req.params; // n cantidad de numeros - especificado por parametro.
    const child = fork(`${path.join(__dirname, `../fork/calculoExterno.js`)}`);

    child.send(number);

    child.on('message', (message) => {
        res.send(message);
    });
});

module.exports = { randomApiRouter };