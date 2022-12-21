const express = require('express');             // Uso de la libreria Express.

const app = express();                          // Instancia del servidor.

app.use(express.json());                        // JSON format para el req.body
app.use(express.static('public'));              // Uso de carpeta public como raiz para archivo Index.html
app.use(express.urlencoded({extended: true}));

app.set('views', './pugViews');
app.set('view engine', 'pug');

app.get('/hello', (req, res) => {
    res.render('hello.pug', { mensaje: 'Usando Plantilla PUG JS en Express'});
});


// Inicio la escucha del servidor.
const PORT = 8080;
app.listen(PORT, ()=> console.log(`Listening on port: ${PORT}`));