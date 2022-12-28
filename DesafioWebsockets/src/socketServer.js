/*
>> Consigna 1:  Modificar el último entregable para que disponga de un canal de websocket que permita representar,
por debajo del formulario de ingreso, una tabla con la lista de productos en tiempo real. Puede haber varios
clientes conectados simultáneamente y en cada uno de ellos se reflejarán los cambios que se realicen en los
productos sin necesidad de recargar la vista. Cuando un cliente se conecte, recibirá la lista de productos.

>> Aspectos a incluir en el entregable:
Para construir la tabla dinámica con los datos recibidos por websocket utilizar Handlebars en el frontend.
Considerar usar archivos públicos para alojar la plantilla vacía, y obtenerla usando la función fetch( ).

>> Consigna 2:  Añadiremos al proyecto un canal de chat entre los clientes y el servidor.

>> Aspectos a incluir en el entregable:
En la parte inferior del formulario de ingreso se presentará el centro de mensajes almacenados en el servidor,
donde figuren los mensajes de todos los usuarios identificados por su email. 
El formato a representar será:
email (texto negrita en azul)
fecha y hora [DD/MM/YYYY HH:MM:SS] (texto normal en marrón)
mensaje (texto italic en verde)

usuario/correo [26/12/2022 10:00:00] : Mensaje enviado !!

Además incorporar dos elementos de entrada: uno para que el usuario ingrese su email (obligatorio para poder
utilizar el chat) y otro para ingresar mensajes y enviarlos mediante un botón. 
Los mensajes deben persistir en el servidor en un archivo.
*/

const express = require('express');
const { createServer } = require('http');
const socketIo = require('socket.io');

const path = require ('path');  // Para el uso de rutas filePaths absolutos.

const app = express();
const server = createServer(app);
const io = socketIo(server, {cors: {origin:"*"}});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${path.join(__dirname, `../public`)}`));

const ContenedorArchivo = require('../api/contenedorArchivo.js');   // Uso del modulo del sesafio anterior de archivos.
const fileProducts = new ContenedorArchivo('productos');            // Genero la instancia del archivo txt como base de datos.
let arrayProducts = fileProducts.getAll();                          // Leo todo el archivo y genero vector de trabajo dinamico en memoria.

const chatLog = new ContenedorArchivo('chatLog');

//--------------------------------------------

// Mensajes de prueba
const messages = [
  { user: "Chat-Bot", time: "", text: "¡Bienvenido! Chat Global envie su mensaje..." }
];

messages[0].time = getTime();

io.on('connection', client => {
  console.log(`Client ${client.id} connected`);

  client.emit('messages', messages);
  client.emit('products', arrayProducts);

  client.on('new-message', message => {
    let now = getTime();
    const newMsg = { time: now, ...message };
    messages.push(newMsg);

    chatLog.saveChat(messages);

    io.sockets.emit('message-added', newMsg);
  });

  client.on('new-product', message => {
    const newId = arrayProducts.length + 1;
    const newObj = { id: newId, ...message };
    arrayProducts.push(newObj);

    io.sockets.emit('product-added', newObj);
  });
});


function getTime(){
  var currentdate = new Date(); 
  var datetime =  currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
  return datetime;
}

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Servidor http WebSocket escuchando en el puerto ${server.address().port}`);
});
server.on("error", error => console.log(`Error en servidor ${error}`));