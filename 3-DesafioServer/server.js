// DESAFIO ARCHIVOS JUEVES 24/11/2022 23:59HS
// >> Consigna:
// Realizar un proyecto de servidor basado en node.js que utilice el módulo express e implemente los siguientes endpoints en el puerto 8080:
// Ruta get '/productos' que devuelva un array con todos los productos disponibles en el servidor
// Ruta get '/productoRandom' que devuelva un producto elegido al azar entre todos los productos disponibles
// Incluir un archivo de texto 'productos.txt' y utilizar la clase Contenedor del desafío anterior para acceder a los datos persistidos del servidor.

// Antes de iniciar el servidor, colocar en el archivo 'productos.txt' tres productos como en el ejemplo del desafío anterior.
// Datos cargados de ejemplo:
// [
//  {"id":1,"name":"Abradolf Lincler","image":"https://rickandmortyapi.com/api/character/avatar/7.jpeg"},
//  {"id":2,"name":"Albert Einstein","image":"https://rickandmortyapi.com/api/character/avatar/11.jpeg"},
//  {"id":3,"name":"Ants in my Eyes Johnson","image":"https://rickandmortyapi.com/api/character/avatar/20.jpeg"}
// ]

const express = require('express'); // Modulo para crear servidor.
const app = express();              // Instanciacion del servidor.

const ContenedorArchivo = require('./contenedorArchivo'); // Uso del modulo del sesafio anterior de archivos.

const products = new ContenedorArchivo('productos');      // Genero la instancia del archivo txt como base de datos.

app.get('/productos', function (_, res) {   // Metodo de accion para url /productos.
    const productsJSON = products.getAll(); // Uso de ContenedorArchivo para lectura del txt.
    let html = "";

    productsJSON.forEach(element => {       // Generando el string de contenido HTML.
        html += `<p style="color:red;">${element.name}</p>
        <img src="${element.image}" alt="${element.name}" width="100" height="100">`;
    });

    res.send(
        `<h1 style="color:blue;">Productos Disponibles</h1>
        ${html}`
    );
});

app.get('/productosRandom', (_, res) => {  // Metodo de accion para url /productosRandom.
    const element = products.getRandom();  // Uso de ContenedorArchivo para lectura del txt.

    let html = `<p style="color:red;">${element.name}</p>   
    <img src="${element.image}" alt="${element.name}" width="100" height="100">`;
    
    res.send(
        `<h1 style="color:blue;">Producto Aleatorio:</h1>
        ${html}`
    );
});

let count = 0;
app.get('/visitas', (_, res) => {
    count ++;
    res.send(`Tenemos ${count} visitas`);
});


const PORT = 8080;              // Puerto de escucha para el servidor.
app.listen(PORT, () =>          // Deamon Server en puerto seteado.
    console.log(`Listening in port ${PORT}`)
); 
