# BackEnd - Comision - 40845
Coder HouseCurso - Curso BackEnd

*Alumno:* **RAMIRO O. VECHIOLA**

*Profesor:* **RAFAEL OCHOA**

*Tutoe Personal:* **Michel Douglas Ezequiel Chamarez Richards**

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
