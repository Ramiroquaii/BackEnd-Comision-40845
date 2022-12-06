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

const express = require('express');
const { Router } = express;

const app = express();

app.use(express.json());

const productRouter = Router();
productRouter.get('/', (req, res) => {
    const { pos } = req.params;

    if(pos){
        res.send(`Por SI ${pos}`);
    }else{
        res.send(`Por NO ${pos}`);
    }
});

productRouter.post('/', (req, res) => res.send("Request POST Add"));
productRouter.put('/', (req, res) => res.send("Request PUT Update"));
productRouter.delete('/', (req, res) => res.send("Request DELETE"));

app.use('/api/productos', productRouter);
app.use('/api/productos/:pos', productRouter);

const PORT = 8080;
app.listen(PORT, ()=> console.log(`Listening on port: ${PORT}`));




// https://gist.github.com/ochoacabriles/0aeab3d22473f1ae0f5c0d8b3dbdefe8    ############ GIST Profesor



// POSTMAN ############################################################################################

// ramiroscar@gmail.com

// Ramiroquaii
// coswe.rh3ton


// https://app.getpostman.com/join-team?invite_code=bd0d42f7413fa7fd2e71c0c2842dd2ab    LINK Invitavion


// REMOVER CARACTERES DE UN STRING ################################
// const remover = ['.','¿','?','!'];
// for (let char of remover) { frase = frase.replaceAll(char,' ') }
// frase
// .split(' ')
// .map(word => word.trim())
// .filter(word => word != '');