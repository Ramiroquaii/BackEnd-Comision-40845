
const fs = require('fs');


class ContenedorArchivo {

    static archivosAbiertos = 0;

    constructor(file, path) {
        this.textType = 'utf-8';

        if(path == "" || path == null || path == undefined){
            this.workingPath = __dirname;
        } else {
            this.workingPath = path;
        }
        this.fileName = file;
        this.fullPath = `${this.workingPath}/${this.fileName}`;
        ContenedorArchivo.archivosAbiertos = ++ContenedorArchivo.archivosAbiertos;
    }

    save(Object) { // Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
        return idSavedObject;
    }
    getById(idNumber) { //Recibe un id y devuelve el objeto con ese id, o null si no está.
        return searchResult;
    }

    getAll = async () => { // Devuelve un array con los objetos presentes en el archivo.
        let fileData;
        let fileDataJson;
        try {
            fileData = await fs.promises.readFile(this.fullPath, this.textType);
        } catch (err) {
            //throw (err);
            console.log(err);
        }
        try {
            fileDataJson = JSON.parse(fileData);
        } catch (err) {
            //throw (err);
            console.log(err);
        }

        //return objectCollection;
        console.log(fileDataJson);
    }

    deleteById(idNumber) { // Elimina del archivo el objeto con el id buscado.

    } 
    deleteAll = async () => { // Elimina todos los objetos presentes en el archivo.
        let emptyArray = [];
        try {
            await fs.promises.writeFile(this.fullPath, JSON.stringify(emptyArray));
        } catch (err) {
            console.error(err);
        }
    } 

}

const file1 = new ContenedorArchivo('test.txt');

file1.getAll();

file1.deleteAll();

file1.getAll();
