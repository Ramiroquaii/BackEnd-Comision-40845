# BackEnd - Comision - 40845
Coder HouseCurso - Curso BackEnd

*Alumno:* **RAMIRO O. VECHIOLA**

*Profesor:* **RAFAEL OCHOA**

*Tutoe Personal:* **Michel Douglas Ezequiel Chamarez Richards**

# DESAFIO ARCHIVOS JUEVES 24/11/2022 23:59HS
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
