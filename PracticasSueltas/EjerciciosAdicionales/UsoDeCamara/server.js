const express = require('express');
const { createServer } = require('http');
const { Router } = express;
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const zlib = require('zlib');
const barcodeXpress = require('barcode-js');

const bodyParser = require('body-parser');

const app = express();
const server = createServer(app);

app.use(express.json({ limit: '5mb' }));
app.use(express.static('public'));
app.use(express.urlencoded({ limit: '5mb', extended: true }));

app.use(bodyParser.json({ limit: '5mb' }));

async function decodeImage(imgString) {

    const buffer = Buffer.from(imgString.split(',')[1], 'base64');

    await sharp(buffer)
        .resize(300, 200)
        .toBuffer()
        .then(resizedBuffer => {
            // Analyze the resized image buffer
            fs.writeFileSync(path.join(__dirname, './tempImgFolder/image.bmp'), resizedBuffer, (error) => {
                if (error) {
                    console.error('Error Writing File:', error);
                    return -1
                } else {
                    console.log('File has been saved !!');
                }
            });
        })
        .catch(error => {
            console.error('Error Buffer Resize:', error);
            return -1
        });

    const results = await barcodeXpress.analyze(path.join(__dirname, './tempImgFolder/image.bmp'), {
        type: barcodeXpress.BarcodeType.ALL
    });

    if(results.length != 0){
        return results[0].value;
    } else {
        return -1;
    }
}

const decodeRouter = Router();
app.use('/decode', decodeRouter);

decodeRouter.get('/', (req, res) => {
    const serverInfo = {
        'ID de Proceso': process.pid,
        'Puerto Servidor': server.address().port
    };
    res.json(serverInfo);
});

decodeRouter.post('/', async (req, res) => {
    const compressedPayload = req.body;

    const result = await decodeImage(compressedPayload.image);

    if(result == -1){
        res.send(JSON.stringify({ "status": "ERROR", "info": "Imagen no reconocida - Escanee nuevamente" }));
    } else {
        res.send(JSON.stringify({ "status": "RECIBIDO", "info": result }));
    }

    // zlib.gunzip(compressedPayload, (err, payload) => {
    //     if (err) {
    //         console.error(err);
    //         res.status(500).send('Internal server error !!');
    //     } else {
    //         // Handle the payload
    //         console.log(`Received payload of size ${payload.length} bytes`);
    //         console.log(payload.image);
    //         res.status(200).send('Payload received');
    //         //res.send(decodeImage(img));
    //     }
    // });
    //res.send(JSON.stringify({ "status": "RECIBIDO", "info": result }));
});

server.listen(8080, () => {
    console.log(`Servidor http WebSocket en puerto ${server.address().port} - PID: ${process.pid}`);
});
server.on("error", error => console.log(`Error en servidor ${error}`));