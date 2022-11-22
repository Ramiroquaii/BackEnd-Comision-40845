const fs = require('fs');

class ContenedorArchivo {

    static archivosAbiertos = 0;

    constructor(file, path) {
        this.textType = 'utf-8';

        if(path === "" || path === null || path === undefined) {
            this.workingPath = __dirname;
        } else {
            this.workingPath = path;
        }
        this.fileName = file;
        this.fullPath = `${this.workingPath}/${this.fileName}`;

        console.log(this.fullPath);
        ContenedorArchivo.archivosAbiertos = ++ContenedorArchivo.archivosAbiertos;
    }

    save(Object) { // Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
        return idSavedObject;
    }
    getById(idNumber) { //Recibe un id y devuelve el objeto con ese id, o null si no está.
        return searchResult;
    }

    getAll = async () => { // Devuelve un array con los objetos presentes en el archivo.
        let fileContent = await this.readFile();
        if(fileContent !== -1){
            let json = await this.jsonFormat(fileContent);
            if(json != -1){
                return json;
            } else {
                throw Error('El contenido no esta en formato JSON.');
            }
        } else {
            throw Error('El directorio o archivo no existen !!');
        }
    }

    readFile = async () => {
        let fileData;
        try {
            fileData = await fs.promises.readFile(this.fullPath, this.textType);
        } catch (err) {
            fileData = -1;
        }
        return fileData;
    }

    jsonFormat = async (fileData) =>{
        let fileDataJson;
        try {
            fileDataJson = await JSON.parse(fileData);
        } catch (err) {
            fileDataJson = -1;
        }
        return fileDataJson;
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

const file2 = new ContenedorArchivo('test.txt', 'C:/Users/Administrador/Desktop/testFile');

let a = file1.getAll();

let b = file2.getAll();

// setTimeout(() => {
//     console.log(a);
//     console.log(b);
// }, 4000);

(async function() {
    try {
        const datos = await file1.getAll();
        const datos2 = await file2.getAll();
        console.log(datos);
        console.log(datos2);
    } catch (e) {
        console.log(`Sale ERROR: ${e}`);
    }
})()


//file1.deleteAll();

//file1.getAll();
