/*
>> Consigna: Tomando como base las clases Contenedor en memoria y en archivos, desarrollar un nuevo contenedor con idénticos
métodos pero que funcione sobre bases de datos, utilizando Knex para la conexión. Esta clase debe recibir en su constructor
el objeto de configuración de Knex y el nombre de la tabla sobre la cual trabajará.
Luego, modificar el desafío entregable de la clase 11 ”Chat con Websocket”, y:
  1. cambiar la persistencia de los mensajes de filesystem a base de datos SQLite3.
  2. cambiar la persistencia de los productos de memoria a base de datos MariaDB.

Desarrollar también un script que utilizando knex cree las tablas necesarias para la persistencia en cuestión
(tabla mensajes en sqlite3 y tabla productos en mariaDb).
NPM RUN:
- socketServer  lanza el servidor websocket con index.html como front para probar funcionalidad.
- rst_dbs       resetea todas las DBs - Recrea e inicializa los datos de prueba.
- rst_litedb    resetea la SQLite DB - Borra archivo local y lo recrea inicializandolo msg bienvenida (Mensajes de Chat).
- rst_mariadb   resetea la Maria DB - DROP Database, CREATE, INSERT de testing (Informacion de Productos).

>> Notas:
Definir una carpeta DBLite para almacenar la base datos SQLite3 llamada mydb.sqlite (archivo DB Lite).

>> Formatos de Bases y Tablas:

** MariaDB (configurar conexion knex segun file options ../dbOptions/mariaDB.js)
Tabla productos:
________________________________________________
|   id_prod   |  name  | price | image  | stock |
-------------------------------------------------
| incremental | string | float | string |  int  |

** SSQLite (configurar conexion knex segun file options ../dbOptions/sqlite3.js)
Tabla mensajes:
_____________________________________________
|   id_msg    |  user  | mensaje | timestamp |
----------------------------------------------
| incremental | string | string  |   date    |

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

const { selectMensaje } = require('../Lite-Querys/select_mensaje.js');
const { selectProducto } = require('../SQL-Querys/select_product.js');

let arrayProducts = [];    
let messages = [];

inicializar = async () => {
  arrayProducts = await selectProducto('ALL');    
  messages = await selectMensaje('ALL');
}

inicializar();


//--------------------------------------------

io.on('connection', client => {
  console.log(`Client ${client.id} connected`);

  client.emit('messages', messages);
  client.emit('products', arrayProducts);

  // client.on('new-message', message => {
  //   let now = getTime();
  //   const newMsg = { time: now, ...message };
  //   messages.push(newMsg);

  //   chatLog.saveChat(messages);

  //   io.sockets.emit('message-added', newMsg);
  // });

  // client.on('new-product', message => {
  //   const newId = arrayProducts.length + 1;
  //   const newObj = { id: newId, ...message };
  //   arrayProducts.push(newObj);

  //   io.sockets.emit('product-added', newObj);
  // });
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