// >> Consigna:
// Realizar un proyecto de servidor basado en node.js y express que ofrezca una API RESTful de productos.
// En detalle, que incorpore las siguientes rutas:
// GET '/api/productos' -> devuelve todos los productos.
// GET '/api/productos/:id' -> devuelve un producto según su id.
// POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
// PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
// DELETE '/api/productos/:id' -> elimina un producto según su id.


// # Para el caso de que un producto no exista, se devolverá el objeto: { error : 'producto no encontrado' }
// # Implementar la API en una clase separada, utilizando un array como soporte de persistencia en memoria.
// # Incorporar el Router de express en la url base '/api/productos' y configurar las subrutas en base a este.
// # Crear un espacio público de servidor que contenga un index.html con un formulario de ingreso de productos.
// # El servidor debe estar basado en express y debe implementar los mensajes de conexión al puerto 8080.
// # En caso de error, representar la descripción del mismo.
// # Las respuestas del servidor serán en formato JSON.
// # La funcionalidad será probada a través de Postman y del formulario de ingreso.

const express = require('express');             // Uso de la libreria Express.
const { Router } = express;                     // Uso de paquete de Rutas de Express.

const app = express();                          // Instancia del servidor.

app.use(express.json());                        // JSON format para el req.body
app.use(express.static('public'));              // Uso de carpeta public como raiz para archivo Index.html
app.use(express.urlencoded({extended: true}));

const apiProductRouter = Router();  // Generacion del objeto ruta para api JSON.
const htmlProductRouter = Router(); // Generacion del objeto ruta para consumo desde navegador.

const ContenedorArchivo = require('./contenedorArchivo'); // Uso del modulo del sesafio anterior de archivos.

const fileProducts = new ContenedorArchivo('productos');      // Genero la instancia del archivo txt como base de datos.

let arrayProducts = fileProducts.getAll();                    // Convierto los datos del archivo a memoria para simplificar uso.


// Defino las rutas de acceso.
app.use('/api/productos', apiProductRouter);
app.use('/api/productos/:id', apiProductRouter);

app.use('/html/productos/', htmlProductRouter);
app.use('/html/productos/:id', htmlProductRouter);

// ***** ▼▼ Estos metodos retornan segmentos de HTML son visualizables desde el navegador ▼▼ ***** //
htmlProductRouter.get('/', (req, res) => {
    let html = "";
    arrayProducts.forEach(element => {       // Generando el string de contenido HTML.
        html += `<p style="color:red;">${element.name}</p>
        <img src="${element.image}" alt="${element.name}" width="100" height="100">`;
    });
    res.send(
        `<h1 style="color:blue;">Productos Disponibles</h1>
        ${html}`
    );
});

htmlProductRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    let html = `<p style="color:red;">NO ENCONTRADO</p>`;
    let objectById = arrayProducts.find(element => element.id == id);
    if(objectById != undefined){
        html = `<p style="color:red;">${objectById.name}</p>
        <img src="${objectById.image}" alt="${objectById.name}" width="100" height="100">`;
    }
    res.send(
        `<h1 style="color:blue;">Producto Buscado por ID: ${id}</h1>
        ${html}`
    );
});
// ***** ▲▲ Estos metodos retornan segmentos de HTML son visualizables desde el navegador ▲▲ ***** //


// GET request que retorna todo el array de productos en formato JSON.
apiProductRouter.get('/', (req, res) => {
    res.json(arrayProducts);
});


// GET request que recibe ID para retornar el objeto que coincida con el ID indicado.
apiProductRouter.get('/:id', (req, res) => {
    const { id } = req.params;                                          // Id recibido por ruta URL
    let objectById = arrayProducts.find(element => element.id == id);   // Busco el producto con el ID indicado.
    if(objectById != undefined){                                        // Evaluo si encontre o no el producto.
        res.json(objectById);                                           // Retorno el objeto solicitado.
    } else {
        res.send("NOT FOUND");                                          // Producto inexistente.
    }
});


// POST request que recibe en formato JSON las key de un nuevo producto a ser agregado.
// En nuevo ID para el producto es generado en este metodo tembien.
apiProductRouter.post('/', (req, res) => {
    const { name, imgurl } = req.body;                       // Recepcion de parametros del request.
    const newId = arrayProducts.length + 1;                 // Generacion del ID - Un numero mas del último.
    const newObj = { id: newId, name: name, image: imgurl }; // Construccion del nuevo objeto producto.
    arrayProducts.push(newObj);                             // Añadido al array de productos.
    res.json(newObj);                                       // Retorno nuevo producto ya con su nuevo ID.
});


// PUT request que actualiza un producto por su ID.
apiProductRouter.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, imgurl } = req.body;

    const indexObjet = arrayProducts.findIndex(element => element.id == id);
    if ( indexObjet != -1 ) {
        arrayProducts[indexObjet].name  = name;
        arrayProducts[indexObjet].image = imgurl;
        res.json(arrayProducts[indexObjet]);
    } else {
        res.send("NOT FOUND - NOT UPDATED"); 
    }
});


// DELETE request que borra el producto del ID indicado si existe.
apiProductRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    const indexObjet = arrayProducts.findIndex(element => element.id == id);    // Busco el indice del producto indicado.
    if ( indexObjet != -1 ) {                                                   // Evaluo si existe o no el producto.
        const deletedProd = arrayProducts.splice(indexObjet, 1);                // De existir lo borro.
        res.json(deletedProd);                                                  // Retorno el producto borrado.
    } else {
        res.send("NOT FOUND - NOT DELETED");                                    // Producto inexistente - No hay acción.
    }
});


// Inicio la escucha del servidor.
const PORT = 8080;
app.listen(PORT, ()=> console.log(`Listening on port: ${PORT}`));