const { options } = require('../dbOptions/mariaDB.js');
const knex = require('knex')(options);

knex.raw('DROP DATABASE IF EXISTS mariadb_appweb')
.then(() => console.log('Database Erased - Full Drop.'))
.catch((err) => { console.log(err); throw err; })
.finally(() => { knex.destroy(); });

knex.raw('CREATE DATABASE mariadb_appweb')
.then(() => console.log('DataBase mariadb_appweb initialized.'))
.catch((err) => { console.log(err); throw err; })
.finally(() => { knex.destroy(); });

knex.schema.createTable('productos', table => {
    table.increments('id_prod');
    table.string('name');
    table.float('price');
    table.string('image');
    table.integer('stock');
})
.then(() => console.log('Table Productos Created'))
.catch((err) => { console.log(err); throw err; })
.finally(() => { knex.destroy(); });

const testDataset = [
    {"name":"Abradolf Lincler","price":100,"image":"https://rickandmortyapi.com/api/character/avatar/7.jpeg","stock":100},
    {"name":"Albert Einstein","price":88,"image":"https://rickandmortyapi.com/api/character/avatar/11.jpeg","stock":100},
    {"name":"Ants in my Eyes Johnson","price":210,"image":"https://rickandmortyapi.com/api/character/avatar/20.jpeg","stock":100}
];

knex('productos').insert(testDataset)
.then(() => console.log('TESTING DataSet Products Loaded.'))
.catch((err) => { console.log(err); throw err; })
.finally(() => { knex.destroy(); });
