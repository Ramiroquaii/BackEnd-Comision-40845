const express = require('express');
const { engine } = require('express-handlebars');
//const handlebars = require('express-handlebars');


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


const ContenedorArchivo = require('../api/contenedorArchivo.js'); // Uso del modulo del sesafio anterior de archivos.

const fileProducts = new ContenedorArchivo('productos');      // Genero la instancia del archivo txt como base de datos.

let arrayProducts = fileProducts.getAll();

const path = require ('path');

//--------------------------------------------


app.set("view engine", "hbs");
app.set("views", `${path.join(__dirname, `../views`)}`);

app.engine(
    'hbs',
    engine({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
    })
);

//--------------------------------------------

app.post('/productos', (req, res) => {
    const producto = req.body;
    const newId = arrayProducts.length + 1;
    const newObj = { id: newId, ...producto };
    arrayProducts.push(newObj);
    res.redirect('/');
});

app.get('/productos', (req, res) => {
    
    res.render("vista", {
        productos: arrayProducts,
        hayProductos: arrayProducts.length
    });
});

app.get('/', (req, res) => {
    res.redirect('/index.html');
});

//--------------------------------------------
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", error => console.log(`Error en servidor ${error}`));
