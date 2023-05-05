const { options } = require('../dbOptions/mariaDB.js');
const knex = require('knex')(options);

existeProducto = async (nombre) => {
    let exist;

    await knex.from('productos').select('*').where('name','=',`${nombre}`)
    .then((rows) => {
        exist = rows.length;
    })
    .catch((err) => { console.log(err); throw err })
    .finally(() => { knex.destroy(); });
    
    return exist; // 0 si no existe nombre y != 0 si existe en la BD.
}

module.exports = { existeProducto };