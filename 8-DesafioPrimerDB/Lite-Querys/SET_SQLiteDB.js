const fs = require ('fs');
const path = require ('path');

const { options } = require('../dbOptions/sqlite3.js');
const knex = require('knex')(options);

function createTableMensajes(){
    knex.schema.createTable('mensajes', table => {
        table.increments('id_msg');
        table.string('user');
        table.string('mensaje');
        table.date('timestamp');
    })
    .then(() => console.log('Table Mensajes Created'))
    .catch((err) => { console.log(err); throw err; })
    .finally(() => { knex.destroy(); })
}

try {
    fs.unlinkSync(path.join(__dirname, '../DBLite/mydb.sqlite'));
    console.log('Successfully deleted ../DBLite/mydb.sqlite');
} catch (e) {
    if (e.code == 'ENOENT') {
        console.error('SQLite file not fount, a new will be created...');
    } else {
        console.error(e);
    }
}

try {
    fs.writeFileSync(path.join(__dirname, '../DBLite/mydb.sqlite'), '');
    console.log('Successfully RESET DB ../DBLite/mydb.sqlite - New file created');
} catch (e) {
    console.error(e);
}

createTableMensajes();

let time = new Date();

const testDataset = [
    {"user":"System-Bot","mensaje":"Bienvenido al chat web !!","timestamp":`${time}`}
];

knex('mensajes').insert(testDataset)
.then(() => console.log('Wellcome Message Loaded into table mensajes.'))
.catch((err) => { console.log(err); throw err; })
.finally(() => { knex.destroy(); });

module.exports = { createTableMensajes };