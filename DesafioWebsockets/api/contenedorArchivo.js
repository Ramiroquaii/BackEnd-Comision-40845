// DESAFIO ARCHIVOS JUEVES 24/11/2022 23:59HS
// >> Consigna:
// Implementar programa que contenga una clase llamada Contenedor que reciba el
// nombre del archivo con el que va a trabajar e implemente los siguientes métodos:
// ● save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
// ● getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
// ● getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
// ● deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
// ● deleteAll(): void - Elimina todos los objetos presentes en el archivo.

// >> Aspectos a incluir en el entregable:
// - El método save incorporará al producto un id numérico, que deberá ser siempre uno más que el id
// del último objeto agregado (o id 1 si es el primer objeto que se agrega) y no puede estar repetido.
// - Tomar en consideración el contenido previo del archivo, en caso de utilizar uno existente.
// - Implementar el manejo de archivos con el módulo fs de node.js, utilizando promesas con
// async/await y manejo de errores.
// - Probar el módulo creando un contenedor de productos, que se guarde en el archivo:
// “productos.txt”
// - Incluir un llamado de prueba a cada método, y mostrando por pantalla según corresponda para
// verificar el correcto funcionamiento del módulo construído.
// - El formato de cada producto será :
// {
//     id: 1
//     name: 'Nombre',
//     image: 'http://url/imagen.jpeg'
// };

const fs = require ('fs');
const path = require ('path');

class ContenedorArchivo {

    static archivosAbiertos = 0;

    constructor (fileName) {
        this.fileName = fileName

        ContenedorArchivo.archivosAbiertos = ++ContenedorArchivo.archivosAbiertos;
    }

    save = async (product) => {        
        const fileData = fs.readFileSync(`${path.join(__dirname, `./${this.fileName}.txt`)}`, 'utf-8');  // Copio contenido archivo.
        const fileDataJson = JSON.parse(fileData);                            // Convierto el string en formato JSON Array.
        const objet = fileDataJson[( fileDataJson.length - 1)];               // Obtengo el ultimo elemento.
        const newID = objet.id + 1;                                           // Genero un nuevo ID sumando 1 al ultimo ID existente.
        const newProduct = {'id':newID, ...product};                          // Armo el nuevo objeto producto uniendo el nuevo ID.
        fileDataJson.push(newProduct);                                        // Agrego al final el nuevo objeto.
        const fileDataString = JSON.stringify(fileDataJson);                  // Convierto el string a texto.
        
        // Sobreescribo el archivo con el nuevo contenido.
        try {
            await fs.promises.writeFile(`./${this.fileName}.txt`, fileDataString);
        } catch (err) {
            console.error(err);
        }
        return (newID);
    }

    saveChat = async (chatMsg) => {        
        const fileData = fs.readFileSync(`${path.join(__dirname, `./${this.fileName}.txt`)}`, 'utf-8');  // Copio contenido archivo.
        const fileDataJson = JSON.parse(fileData);                            // Convierto el string en formato JSON Array.
        fileDataJson.push(chatMsg);                                        // Agrego al final el nuevo objeto.
        const fileDataString = JSON.stringify(fileDataJson);                  // Convierto el string a texto.
        
        // Sobreescribo el archivo con el nuevo contenido.
        try {
            await fs.promises.writeFile(`${path.join(__dirname, `./${this.fileName}.txt`)}`, fileDataString);
        } catch (err) {
            console.error(err);
        }
    }

    getRandom() {
        const fileData = fs.readFileSync(`./${this.fileName}.txt`, 'utf-8');
        const fileDataJson = JSON.parse(fileData);
        const cantidad = fileDataJson.length;
        const product = this.getById(this.randomIdNumber(1,cantidad));
        return product;
    }

    randomIdNumber(min, max) {
        return Math.floor((Math.random() * (max - min + 1)) + min);
    }

    getById(idNumber) {
        const fileData = fs.readFileSync(`./${this.fileName}.txt`, 'utf-8');
        const fileDataJson = JSON.parse(fileData);
        let objectId = null;
        objectId = fileDataJson.find(element => element.id == idNumber);
        return objectId;
    }

    getAll () {
        const fileData = fs.readFileSync(`${path.join(__dirname, `./${this.fileName}.txt`)}`, 'utf-8');
        return (JSON.parse(fileData));
    }

    deleteById = async (idNumber) => {
        const fileData = fs.readFileSync(`./${this.fileName}.txt`, 'utf-8');
        const fileDataJson = JSON.parse(fileData);
        const indexObjet = fileDataJson.findIndex(element => element.id == idNumber);
        if ( indexObjet != -1 ) {
            fileDataJson.splice(indexObjet, 1);
            const fileDataString = JSON.stringify(fileDataJson);
            try {
                await fs.promises.writeFile(`./${this.fileName}.txt`, fileDataString);
            } catch (err) {
                console.error(err);
            }
        }
    }

    deleteAll = async () => {        
        let emptyArray = [];
        try {
            await fs.promises.writeFile(`./${this.fileName}.txt`, JSON.stringify(emptyArray));
        } catch (err) {
            console.error(err);
        }
    }
}

module.exports = ContenedorArchivo; // Exportacion del modulo de este archivo para ser usado en otros sitios.