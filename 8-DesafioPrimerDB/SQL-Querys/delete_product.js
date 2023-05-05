const { options } = require('../dbOptions/mariaDB.js');
const knex = require('knex')(options);

function deleteProducto(idProd){
    knex.from('productos').where('id_prod','=',`${idProd}`)
        .then(() => console.log(`Producto ID: ${idProd} deleted.`))
        .catch((err) => { console.log(err); throw err })
        .finally(() => { knex.destroy(); });
}

module.exports = { deleteProducto };