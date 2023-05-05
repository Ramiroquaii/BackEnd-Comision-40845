/*
>> Consigna:
Utilizando Mongo Shell, crear una base de datos llamada ecommerce que contenga dos colecciones: mensajes y productos.

1) Agregar 10 documentos con valores distintos a las colecciones mensajes y productos.
2) El formato de los documentos debe estar en correspondencia con el que venimos utilizando en el entregable con MariaDB.
    En el caso de los productos, poner valores al campo precio entre los 100 y 5000 pesos(eligiendo valores intermedios. 
3) Listar todos los documentos en cada colección.
4) Mostrar la cantidad de documentos almacenados en cada una de ellas.
5) Realizar un CRUD sobre la colección de productos:
    a- Agregar un producto más en la colección de productos 
    b- Realizar una consulta por nombre de producto específico:
        b1. Listar los productos con precio menor a 1000 pesos.
        b2. Listar los productos con precio entre los 1000 a 2000 pesos.
        b3. Listar los productos con precio mayor a 3000 pesos.
        b4. Realizar una consulta que traiga sólo el nombre del tercer producto más barato.
    c- Hacer una actualización sobre todos los productos, agregando el campo stock a todos ellos con un valor de 100.
    d- Cambiar el stock a cero de los productos con precios mayores a 4000 pesos. 
    e- Borrar los productos con precio menor a 1000 pesos*
6) Crear un usuario 'pepe' clave: 'asd456' que sólo pueda leer la base de datos ecommerce.
    Verificar que pepe no pueda cambiar la información.
*/

// 1) Productos cargados en Collection Productos  ***************************************
db.productos.insertMany( [ { },{ }, { } ] )
[	
{ name:"Rick Sanchez", price:925, image:"https://rickandmortyapi.com/api/character/avatar/1.jpeg",stock:50 },
{ name:"Morty Smith",price:1430,image:"https://rickandmortyapi.com/api/character/avatar/2.jpeg",stock:100 },
{ name:"Summer Smith",price:925,image:"https://rickandmortyapi.com/api/character/avatar/3.jpeg",stock:10 },
{ name:"Beth Smith",price:500,image:"https://rickandmortyapi.com/api/character/avatar/4.jpeg",stock:75 },
{ name:"Jerry Smith",price:2142,image:"https://rickandmortyapi.com/api/character/avatar/5.jpeg",stock:100 },
{ name:"Abadango Cluster Princess",price:1136,image:"https://rickandmortyapi.com/api/character/avatar/6.jpeg",stock:83 },
{ name:"Abradolf Lincler",price:1500,image:"https://rickandmortyapi.com/api/character/avatar/7.jpeg",stock:5 },
{ name:"Adjudicator Rick",price:2200,image:"https://rickandmortyapi.com/api/character/avatar/8.jpeg",stock:2 },
{ name:"Agency Director",price:830,image:"https://rickandmortyapi.com/api/character/avatar/9.jpeg", stock:1 },
{ name:"Alan Rails",price:1000,image:"https://rickandmortyapi.com/api/character/avatar/10.jpeg", stock:0 }
]

// 1) Mensajes cargados en Collection Mensajes ******************************************
db.mensajes.insertMany( [ { },{ }, { } ] )
[
{ user:"Chat-Bot",mensaje:"Bienvenidos al chat !!",timestamp: new Date() },
{ user:"Ramiro",mensaje:"Esntrega de Base Mongo",timestamp: new Date() },
{ user:"Rafael",mensaje:"Genial, como la ensamblaste ?",timestamp: new Date() },
{ user:"Ramiro",mensaje:"Usando MongoDB desde el shell y con Compass",timestamp: new Date() },
{ user:"Ramiro",mensaje:"El zip con la base de datos montada y sus colecciones...",timestamp: new Date() },
{ user:"Estanislao",mensaje:"Practicaste las consultas del entregable ?",timestamp: new Date() },
{ user:"Ramiro",mensaje:"Un CRUD basico sobre las colecciones Productos y Mensajes,",timestamp: new Date() },
{ user:"Rafael",mensaje:"Esta completa ?",timestamp: new Date() },
{ user:"Ramiro",mensaje:"Funcional desde Mongo shell o Compass",timestamp: new Date() },
{ user:"Ramiro",mensaje:"Tambien hay un pequeño server e interfaz html para ejecutar...",timestamp: new Date() }
]

// 3) Listar todos los doc de cada collection.
db.mensajes.find()
db.productos.find()

// 4) Listar la cantidad todal de docs por collection.
db.mensajes.countDocuments()
db.productos.countDocuments()

// 5) CRUD en Mongo ******************************************************************************************** ▼▼ ▼▼

// 5a- Insertar un nuevo producto.
db.productos.insertOne({
    name:'Albert Einstein',
    price:4001,
    image:'https://rickandmortyapi.com/api/character/avatar/11.jpeg',
    stock:15
})

// 5b- Filtros de busqueda:

db.productos.find( {price: {$lt: 1000}} ) // 5b1 Listar los productos con precio menor a 1000 pesos.

db.productos.find( {$and: [{price: {$gt:1000}},{price:{$lt:2000}}]} ); // 5b2. Listar productos con precio entre 1000 a 2000 pesos.

db.productos.find( {price: {$gt: 3000}} ) // 5b3. Listar los productos con precio mayor a 3000 pesos.

db.productos.find().sort({price:1}).skip(2).limit(1) // 5b4. Realizar una consulta que traiga sólo el nombre del tercer producto más barato.

// 5c- Hacer una actualización sobre todos los productos, agregando el campo stock a todos ellos con un valor de 100.
db.productos.updateMany( {stock: { $gte:0 } }, { $set: { stock:100 } } )

// 5d- Cambiar el stock a cero de los productos con precios mayores a 4000 pesos.
db.productos.updateMany( {price: { $gt:4000 } }, { $set: { stock:0 } } )

// 5e- Borrar los productos con precio menor a 1000 pesos*
db.productos.deleteMany( {price: { $lt:1000 } } ) //No fue ejecutada en la base para no eliminar en cantidad.


// 5) CRUD en Mongo ******************************************************************************************** ▲▲ ▲▲

// 6) Usuarios:
db.createUser( {
    user: "pepe",
    pwd: "asd456",
    roles: [ { role: "read", db: "ecommerce" } ]
} );

// comando: -->    mongosh -u pepe -p asd456   //para iniciar la consola con el usuario pepe








