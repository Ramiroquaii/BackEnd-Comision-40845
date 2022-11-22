/* 
Realizar un programa que ejecute las siguientes tareas:
A) Lea el archivo info.txt generado en el desafío anterior deserializándolo en un objeto llamado info.
B) Mostrar este objeto info en la consola.
C) Modifique el author a "Coderhouse" y guarde el objeto serializado en otro archivo llamado package.json.coder
D) Mostrar los errores por consola.
*/

const fs = require('fs');
/*
fs.promises.readFile('./info.txt', 'utf-8')
    .then(value => {
    const info = JSON.parse(value);
    console.log(info);
    info.contenidoObj.author = 'Coderhouse actualizado';
    return fs.promises.writeFile('./package.json', '');
    })
    .then(() => {
    console.log('Done');
    })
    .catch((err) => {
    console.error(err);
    });
/* */

const updateAuthor = async () => {
    let fileData;
    try {
    fileData = await fs.promises.readFile('./info.txt', 'utf-8');
    } catch (err) {
    throw (err);
    }

    const fileDataJson = JSON.parse(fileData);
    fileDataJson.contenidoObj.author = 'Otra vez lo actualicé';

    try {
    await fs.promises.writeFile('./package.json', JSON.stringify(fileDataJson.contenidoObj, null, 2));
    } catch (err) {
    console.error(err);
    }
};

updateAuthor().then(() => console.log('Listo'));


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// OTRO EJEMPLO TUTOR /////////////////////////////////////////////////////////////////////////////////////////////////

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("What is your name? ", function (answer) {
    console.log(`Oh, so your name is ${answer}`);
    console.log("Closing the interface");
    rl.close();
});


const fs = require("fs");

fs.open("sample.txt", "w", (err, file) => {
    if (err) throw err;
    console.log(file);
});

///////////////////////////////////////////////////////////////////////

const fs = require('fs');
const path = require('path')


const dataAppender = (persona)=>{

    joined_path = path.join(__dirname,'/files/text.txt')
    
    
    try{
        if (fs.existsSync(joined_path)){
            fs.appendFileSync(joined_path, `${JSON.stringify(persona)}\n`)
    
        }else{
            fs.mkdirSync('./files');
            fs.writeFileSync(joined_path,`${JSON.stringify(persona)}\n`)
        }
    
        let fileData = fs.readFileSync(joined_path,'utf-8');
    
        console.log({fileData});
    }
    catch(e){
        console.log(e);
    }
}


let persona = {
    nombre : 'Laboriel',
    edad: 44 ,
    email: 'mail@mail.com'
}


dataAppender(persona)
dataAppender({'nombre':'Juan Carlos'})
