# BackEnd - Comision - 40845
Coder HouseCurso - Curso BackEnd

*Alumno:* **RAMIRO O. VECHIOLA**

*Profesor:* **RAFAEL OCHOA**

*Tutor Personal:* **Anderson Ocaña** (Actual)
                  **Estanislao Valdez** (hasta el 21/03/2023)
                  **Michel Douglas Ezequiel Chamarez Richards** (hasta el 02/01/2023)

# DESAFIO ENTREGABLE - GraphQL
EXPIRA EL MARTES 2/05/2023 A LAS 23:59HS

>>Se crea la ruta /graphql con la interfaz Graph-i-QL de la propia libreria para probar y ejecutar las siguientes querys genradas:

- query { produtos { _id, name, price, photo} } => Lista todos los productos, se puede seleccionar entre las key deseadas como respuesta.
- query { producto(prodName:"String") } => Busca y lista de existir un producto, se puede seleccionar entre las key deseadas como respuesta.
- query { prodyctoUpdate(prodName:"String", newPrice:"float") } => Actualiza un precio por nombre de producto de existir, retorna mensaje informativo.

El resto de la aplicacion no fue modificada y aun no utiliza graphQL como parte de sus consultas solo se qurea el espacio mencionadoo para pruevas en /graphql.


# DESAFIO ENTREGABLE - Mejorar la arquitectura de nuestra API
EXPIRA EL MARTES 18/04/2023 A LAS 23:59HS

- Se implementa finalmente la estructura DTO y DAO y se ejemplifica el uso del modelo Factory y Repository.
- Solo se plantea hacer la adaptacion de esta estructura a la entidad producto.
- Falta completar contenido se ira cargando.


# DESAFIO ENTREGABLE - Dividir en capas nuestro proyecto
EXPIRA EL JUEVES 06/04/2023 A LAS 23:59HS

- Debido a que la extensión del proyecto no posee una logitud y compejidad muy extensa se demuestra el concepto de capa en una funcion del mismo done podriamos llevar este concepto a la practica:

En el directorio api se encuentra el archivo productos.js y contiene la siguiente función:

>>productosApiRouter.get('/api/productos/:prodName', async (req, res) => {
    const { prodName } = req.params;
    const client = connectAtlas();
    const databaseAtlas = client.db(mongoDBase);
    const collectionProductos = databaseAtlas.collection("productos");
    let producto=[];
    try {
        const query = { name: prodName };
        const result = await collectionProductos.findOne(query);
        if(result == null){
            producto.push( { error: `NO EXISTE ${prodName} EN LA BASE` } );
        } else {
            producto.push(result);
        }
    } finally {
        await client.close();
    }
    res.send(producto);
});

Ahora bien para implementar el concepto de capa y DAO podriamos separar a modeo demostrativo y como ejemplo del servidor el atender la ruta /api/productos/:id funcion exclusiva del servidor del DAO productos (a modo de ejemplo):

**DAO Productos:**
>>conectToProductosDB(){
    const client = connectAtlas();
    const databaseAtlas = client.db(mongoDBase);
    const collectionProductos = databaseAtlas.collection("productos");
    return collectionProductos;
}
>>getOneProduct(idProduct){
    const collection = connectToProductDB();
    const query = { name: idProduct };
    const result = await collection.findOne(query);
    return result;
}

**Server API Router**
>>productosApiRouter.get('/api/productos/:prodName', async (req, res) => {
    const { prodName } = req.params;
    const result = await DAOProductos.getOneProduct(prodName);
    if(result == null){
        res.send( { error: `NO EXISTE ${prodName} EN LA BASE` } );
    } else {
        res.send(result);
    }
});


# DESAFIO ENTREGABLE - Tercera entrega del Proyecto Final
EXPIRA EL JUEVES 30/03/2023 23:59HS
**Avances sobre el proyecto que vamos construyendo desde el principio.**


# DESAFIO ENTREGABLE - Repaso y Actualización de Avance
EXPIRA EL JUEVES 23/03/2023 23:59HS
**Repaso y avances para el proyecto - Revision de contenidos y perfeccionaiento del proyecto.**


# DESAFIO ENTREGABLE - Loggers, gzip y análisis de performance
EXPIRA EL JUEVES 16/03/2023 23:59HS

Implementacion de la libreria Log4js:
LOG LEVEL DEFAULT
- trace: The most verbose level. Used for tracing application code to help with debugging.
- debug: Used for debugging application code.
- info: Used for informational messages.
- warn: Used for warning messages.
- error: Used for error messages.
- fatal: The least verbose level. Used for critical error messages that may cause the application to stop working.

Salida por defaul - level trace -> Consola
Salida warnnings  - level warn  -> archivo warn.log
Salida errors     - level error -> archivo error.log

**Se crea el directorio /logs para contener los archivos de logs**
**Se crea el archivo log4jsConfig.js para parametrizar la configuracion del log**
**De necesitar realizar logs se debera importar el archivo js para hacer uso del codigo donde sea necesario**


# DESAFIO ENTREGABLE - NGINX y CLUSTER
EXPIRA EL JUEVES 09/03/2023 23:59HS

>>node server.js opciones de comando:
Opciones:
      --version            Muestra número de versión               [booleano]
  -p, --serverPort         Port number to use for the server       [número] [defecto: 8080]
  -m, --serverMode         standAlone / cluster : server mode      [cadena de caracteres] [defecto: "standAlone"]
      --clusterPort, --cp  Port number for 1sr server in cluster   [número] [defecto: 8082]
  -h, --help               Muestra ayuda                           [booleano]

>>MODO FORK o STAND ALONE
node server.js -m standAlone (-p 8050 o puerto ejelido para el servidor web)
Process: 6540 runnig MAIN PROCESS Server Handler.
Server MODE: standAlone
Servidor http WebSocket en puerto 8080 - PID: 6540

>>MODO CLUSTER
node server.js -m cluster (-p 8050 o puerto ejelido para el servidor web)
Process: 7832 runnig MAIN PROCESS Server Handler.
Server MODE: cluster
Child process generado: 7884 desde cluster...
Child process generado: 7932 desde cluster...
Child process generado: 7904 desde cluster...
Child process generado: 7916 desde cluster...
Servidor http WebSocket en puerto 8080 - PID: 7832
Servidor CLUSTER en puerto 8082 - PID: 7884 - Parent: 7832
Servidor CLUSTER en puerto 8083 - PID: 7904 - Parent: 7832
Servidor CLUSTER en puerto 8084 - PID: 7932 - Parent: 7832
Servidor CLUSTER en puerto 8085 - PID: 7916 - Parent: 7832

>>NGINX como PROXY
Escucha todas las petiiones en puerto 80 y deriva:
- Ruta raiz / al main server en puerto 8080.
- Ruta /api/randomNumbers y /api/randomNumbers/:n al cluster de servidores en puertos 8082, 8083, 8084 y 8085.
- Ruta /infoCluster al cluster, la respuesta devuelve la info del proceso que atendio la peticion (random).
- No se establece balance de carga con "weight" para redirigir 1 peticion por vez a cada servidor del cluster.


# DESAFIO ENTREGABLE - Objeto Process (Agregados y Mejoras sobre el entregable WebSocket Desafio 6)
EXPIRA EL JUEVES 02/03/2023 23:59HS

- Implementación de libreria Dotenv para parametrizacion de variables de entorno (en archivo .env).
- Implementación de libreria Yargs para parametrización desde linea de comandos (en archivo environment.js).
- Puerto por defecto sin especificar 8080, -h para help, -p newPort para asignarnuevo puerto.
- Manejo del objeto PROCESS - Procesos Hijos - Paralelismo No Bloqueante.
- Ruta adicional "/info" que retorna propiedades del objeto Process.
- Ruta "api/randoms/:n" que dispara un subproceso hijo no bloqueante (fork) donde 'n' es la antidad de numeros aleatorios.

# DESAFIO ENTREGABLE - Session (Agregados y Mejoras sobre el entregable WebSocket Desafio 6)
EXPIRA EL MARTES 21/02/2023 23:59HS

- Implementacion de la libreria express-session.
- Uso de libreria Bcrypt para comprobación de contraseñas.

# DESAFIO ENTREGABLE - Autenticación
EXPIRA EL MARTES 14/02/2023 23:59HS

- Se implemente la conexion de las rutas api rest para mensajes y productos en MongoAtlas Cluster.
- Las rutas establecen el flujo de los datos de la API Rest hacia el server (GET - POST - DELETE):
** api/productos & api/productos/:id**
** api/mensajes & api/mensajes/:id**
- Implementacion de public con la vista de LogIn.
- Se pretende manejas las actualizaciones mediante Sockets.
- Las vistas no se implementan con plantillas, se pretende realizar el consumo de datos de la api y
actualizar el front mediante VanillaJS.

- La Bade Atlas contiene 4 coleciones: users / productos / carritos / mensajes.

>>PENDINETE DE COMPLETAR LA CONEXION DEL FRONT CON EL BACK para que sea 100% Funcional.



# DESAFIO ENTREGABLE - Mocks Faker y Normalización
EXPIRA EL MARTES 07/02/2023 23:59HS

- Ruta "/mock" implementacion y retorno de JSON aleatorio a traves de mock manual. 
- Ruta "/faker" implementacion y retorno de JSON aleatorio usando paquete @faker-js/faker.
- Ruta raiz "/" Frontend de prueba que recibe JSON data aleatoria y genera una visualización.

- No se utiliza entregas anteriores se desarolla la implementación, uso y modalidad de Mocks/Fajer en base
a una simulacion de generación de Usurios.

>>Los datos son generadon dinamicamente y no son persistidos en ningún formato.

**La normalización con el paquete Normalizr se basa en los mismos usuarios pero agrupandolos en companias.
**Las compania se generan dinamicamente con FAKER.
**Ruta de acceso "/companies" muestra la normalización.


# DESAFIO ENTREGABLE - Segunda Pre Entrega
EXPIRA EL MARTES 31/01/2022 23:59HS

>>Consigna: Basándose en los contenedores ya desarrollados (memoria, archivos) desarrollar dos contenedores más (que cumplan con la misma interfaz) que permitan realizar las operaciones básicas de CRUD en MongoDb (ya sea local o remoto) y en Firebase. Luego, para cada contenedor, crear dos clases derivadas, una para trabajar con Productos, y otra para trabajar con Carritos.

>>Aspectos a incluir en el entregable: 
A las clases derivadas de los contenedores se las conoce como DAOs (Data Access Objects), y pueden ir todas incluidas en una misma carpeta de ‘daos’.
En la carpeta de daos, incluir un archivo que importe todas las clases y exporte una instancia de dao de productos y una de dao de carritos, según corresponda. Esta decisión se tomará en base al valor de una variable de entorno cargada al momento de ejecutar el servidor.
Incluir un archivo de configuración (config) que contenga los datos correspondientes para conectarse a las bases de datos o medio de persistencia que corresponda.


# DESAFIO ENTREGABLE - Primer Uso de MongoDB
EXPIRA EL MARTES 24/01/2022 23:59HS

- Se sube archivo con los comandos ejecutados desde el MongoShell para interactuar con la BD.
- Se utilizo tambien la interfaz grarfica Compass par crear la base de datos y probar su funcionalidad.
- Se sube carpeta DUMP con los datos extraidos de la base local con comando mongodump.


# DESAFIO ENTREGABLE - Primer Base de Datos SQL Maria & Lite
EXPIRA EL MARTES 17/01/2022 23:59HS

>> Consigna: Tomando como base las clases Contenedor en memoria y en archivos, desarrollar un nuevo contenedor con idénticos
métodos pero que funcione sobre bases de datos, utilizando Knex para la conexión. Esta clase debe recibir en su constructor
el objeto de configuración de Knex y el nombre de la tabla sobre la cual trabajará.
Luego, modificar el desafío entregable de la clase 11 ”Chat con Websocket”, y:
  1. cambiar la persistencia de los mensajes de filesystem a base de datos SQLite3.
  2. cambiar la persistencia de los productos de memoria a base de datos MariaDB.

Desarrollar también un script que utilizando knex cree las tablas necesarias para la persistencia en cuestión
(tabla mensajes en sqlite3 y tabla productos en mariaDb).
>>*Scrips disponibles npm run:*
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


# DESAFIO ENTREGABLE - Primer Entrega Pre Proyecyo Final
EXPIRA EL MARTES 10/01/2022 23:59HS

**npm run start - para lanzar el server en puerto 8080**
**Se utiliza PostMan para evaluar la funcionalidad de todas las funciones**
**Se implementa index.html en carpeta public a mode de frontend, prueba basica incompleta, se implementa fetch a la API local con metodos GET para traer los datos y mostrarlos en el navegador**

1. El router base '/api/products' implementará cuatro funcionalidades:
    a. GET: '/:id?' - Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores).
    b. POST: '/' - Para incorporar productos al listado (disponible para administradores).
    c. PUT: '/:id' - Actualiza un producto por su id (disponible para administradores).
    d. DELETE: '/:id' - Borra un producto por su id (disponible para administradores).

2. El router base '/api/cart' implementará tres rutas disponibles para usuarios y administradores:
    a. POST: '/' - Crea un carrito y devuelve su id.
    b. DELETE: '/:id' - Vacía un carrito y lo elimina.
    c. GET: '/:id/products' - Me permite listar todos los productos guardados en el carrito.
    d. POST: '/:id/products/:id_prod' - Para incorporar productos al carrito por su id de producto.
    e. DELETE: '/:id/products/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto.


# DESAFIO ENTREGABLE - WEBSOCKETS
EXPIRA EL MARTES 27/12/2022 23:59HS

**npm run socket - para ejecutar directamente el servidor desde la ruta raiz en puerto 8080**

- Directorio raiz de trabajo carpeta DesafioWebsockets.
- Se implementa el guardado historico en archivo de texto en api/chatLog.txt
- No se persisten lo nuevos productos solo se cargan los primeros como template desde archivo y se trabaja dinamicamente en memoria posteriormente, no se salvan al cerrar o salir.

>> Consigna 1:  Modificar el último entregable para que disponga de un canal de websocket que permita representar, por debajo del formulario de ingreso, una tabla con la lista de productos en tiempo real. Puede haber varios clientes conectados simultáneamente y en cada uno de ellos se reflejarán los cambios que se realicen en los productos sin necesidad de recargar la vista. Cuando un cliente se conecte, recibirá la lista de productos.

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



# DESAFIO ENTREGABLE - MOTORES DE PLANTILLAS
EXPIRA EL MARTES 20/12/2022 23:59HS

Consigna - Utilizando la misma API de productos del proyecto entregable de la clase anterior, construir un web server (no REST) que incorpore: Un formulario de carga de productos en la ruta raíz (configurar la ruta '/productos' para recibir el POST, y redirigir al mismo formulario). Una vista de los productos cargado (utilizando plantillas de handlebars) en la ruta GET '/productos'. Ambas páginas contarán con un botón que redirija a la otra.

**GET '/productos' tabla dinamica con productos.**

**POST '/productos' formulario de carga de productos.**

**Los tres mtores de platillas HBS, PUG y EJS implemntan la misma estructura**

- Se continua usando la lectura de archivo de texto para cargr inicialmente los productos, si vien es posible actualiza el archivo con los nuevos productos cargados estos solamente se utilizan de forma dinamica en memoria y no son guardados posteriormente.

- Se implementa el script de JSON para lanzar cada servidor (puertos diferentes para probar en paralelo):
**npm run hbs  servidor en 8081** 

**npm run pug  servidor en 8082**

**npm run ejs  servidor en 8083**


# DESAFIO ENTREGABLE - API REST FUL EXPRESS JS
EXPIRA EL JUEVES 08/12/2022 23:59HS

Consigna - Realizar un proyecto de servidor basado en node.js y express que ofrezca una API RESTful de productos.
En detalle, que incorpore las siguientes rutas:
**GET '/api/productos' -> devuelve todos los productos.**
**GET '/api/productos/:id' -> devuelve un producto según su id.**
**POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.**
**PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.**
**DELETE '/api/productos/:id' -> elimina un producto según su id.**

- Se implementan los metodos que retornan formato JSON en /api/productos
- Se implemente a modo de prueba retorno de bloque HTML consumible desde navegador en /html/productos (solo GET)

## No se tiene en cuanta duplicacion al incorporar nuevos productos.
- Se implemente pequeño formulario de alta de producto en index.html desde ruta raiz "/"


# DESAFIO ENTREGABLE - SERVER WEB EXPRESS JS
EXPIRA EL JUEVES 01/12/2022 23:59HS

Consigna - Realizar un proyecto de servidor basado en node.js que utilice el módulo express e implemente los siguientes endpoints en el puerto 8080:
**Ruta get '/productos' que devuelva un array con todos los productos disponibles en el servidor**
**Ruta get '/productoRandom' que devuelva un producto elegido al azar entre todos los productos**

- Incluir un archivo de texto 'productos.txt' y utilizar la clase Contenedor del desafío anterior para acceder a los datos persistidos del servidor. Antes de iniciar el servidor, colocar en el archivo 'productos.txt' tres productos como en el ejemplo del desafío anterior.

Datos cargados de ejemplo:
[
 {"id":1,"name":"Abradolf Lincler","image":"https://rickandmortyapi.com/api/character/avatar/7.jpeg"},
 {"id":2,"name":"Albert Einstein","image":"https://rickandmortyapi.com/api/character/avatar/11.jpeg"},
 {"id":3,"name":"Ants in my Eyes Johnson","image":"https://rickandmortyapi.com/api/character/avatar/20.jpeg"}
]

# DESAFIO ENTREGABLE - MANEJO DE ARCHIVOS JS
EXPIRA EL JUEVES 24/11/2022 23:59HS

Implementar programa que contenga una clase llamada Contenedor que reciba el nombre del archivo con el que va a trabajar e implemente los siguientes métodos:
**save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.**
**getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.**
**getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.**
**deleteById(Number): void - Elimina del archivo el objeto con el id buscado.**
**deleteAll(): void - Elimina todos los objetos presentes en el archivo.**

Aspectos a incluir en el entregable:
- El método save incorporará al producto un id numérico, que deberá ser siempre uno más que el id del último objeto agregado (o id 1 si es el primer objeto que se agrega) y no puede estar repetido.
- Tomar en consideración el contenido previo del archivo, en caso de utilizar uno existente.
- Implementar el manejo de archivos con el módulo fs de node.js, utilizando promesas con async/await y manejo de errores.
- Probar el módulo creando un contenedor de productos, que se guarde en el archivo: “productos.txt” se utiliza el archivo test.txt en su lugar.
- Incluir un llamado de prueba a cada método, y mostrando por pantalla según corresponda para verificar el correcto funcionamiento del módulo construído.

## Archivo JSON inicial para hacer uso de las funciones de archivos - FileName test.txt:
[
{"id":1,"name":"Abradolf Lincler","image":"https://rickandmortyapi.com/api/character/avatar/7.jpeg"},
{"id":2,"name":"Albert Einstein","image":"https://rickandmortyapi.com/api/character/avatar/11.jpeg"},
{"id":3,"name":"Ants in my Eyes Johnson","image":"https://rickandmortyapi.com/api/character/avatar/20.jpeg"},
]


# DESAFIO ENTREGABLE - CLASES JS
EXPIRA EL JUEVES 17/11/2022 23:59HS
## Consigna: 
- 1) Declarar una clase Usuario
- 2) Hacer que Usuario cuente con los siguientes atributos: nombre: Stringm, apellido: String, libros: Object[], mascotas: String[]
Los valores de los atributos se deberán cargar a través del constructor, al momento de crear las instancias.
- 3) Hacer que Usuario cuente con los siguientes métodos:
**getFullName(): String. Retorna el completo del usuario. Utilizar template strings.**
**addMascota(String): void. Recibe un nombre de mascota y lo agrega al array de mascotas.**
**countMascotas(): Number. Retorna la cantidad de mascotas que tiene el usuario.**
**addBook(String, String): void. Recibe un string 'nombre' y un string 'autor' y debe agregar un objeto: { nombre: String, autor: String } al array de libros.**
**getBookNames(): String[]. Retorna un array con sólo los nombres del array de libros del usuario.**
- 4) Crear un objeto llamado usuario con valores arbitrarios e invocar todos sus métodos.


https://gist.github.com/ochoacabriles/117937b7739d9ffa95c1ea17de9ed2d3
https://gist.github.com/Andru-1987/93537a67decbf494d1ada1c2315421c1
