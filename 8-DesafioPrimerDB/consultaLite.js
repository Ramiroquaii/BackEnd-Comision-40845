
const { insertMensaje } = require('./Lite-Querys/insert_mensaje.js');

const { selectMensaje } = require('./Lite-Querys/select_mensaje.js');

let time = new Date();

const msg = [
    {"user":"User1","mensaje":"Hola 1","timestamp":`${time}`},
    {"user":"User2","mensaje":"Hola 2","timestamp":`${time}`}
];

//createTableMensajes();

insertMensaje(msg);

select = async (param) => {
    const result = await selectMensaje(param);

    result.forEach(element => {
        console.log(`${element.id_msg} : ${element.user} : ${element.mensaje} => ${element.timestamp}`);
    });
}

select('ALL');

console.log('***************************');

select(2);