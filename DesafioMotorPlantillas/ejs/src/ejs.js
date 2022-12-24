const express = require('express')

const path = require ('path');  // Para el uso de rutas filePaths absolutos.

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(`${path.join(__dirname, `../public`)}`))

const ContenedorArchivo = require('../api/contenedorArchivo.js');   // Uso del modulo del sesafio anterior de archivos.
const fileProducts = new ContenedorArchivo('productos');            // Genero la instancia del archivo txt como base de datos.
let arrayProducts = fileProducts.getAll();                          // Leo todo el archivo y genero vector de trabajo dinamico en memoria.

//--------------------------------------------

app.set('view engine', 'ejs');
app.set('views', `${path.join(__dirname, `../views`)}`);

//--------------------------------------------

app.post('/productos', (req, res) => {
    const producto = req.body;
    const newId = arrayProducts.length + 1;
    const newObj = { id: newId, ...producto };
    arrayProducts.push(newObj);
    res.redirect('/');
})

app.get('/productos', (req, res) => {

    res.render("vista", {
        productos: arrayProducts,
        hayProductos: arrayProducts.length
    });
});

//--------------------------------------------

const PORT = 8083
const server = app.listen(PORT, () => {
    console.log(`Servidor http Plantilla EJS escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))
