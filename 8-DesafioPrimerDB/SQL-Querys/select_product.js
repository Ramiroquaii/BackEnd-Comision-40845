const { options } = require('../dbOptions/mariaDB.js');
const knex = require('knex')(options);

async function selectProducto(idProd) {
    let prodFound = [];

    if(idProd == "ALL"){
        await knex.from('productos').select('*')
            .then((rows) => {
                prodFound = rows;
                // for (row of rows) {
                //     console.log(`${row['id_prod']} ${row['name']} ${row['price']} ${row['image']} ${row['stock']}`);
                // }
            })
            .catch((err) => { console.log(err); throw err })
            .finally(() => { knex.destroy(); });
    } else {
        await knex.from('productos').select('*').where('id_prod','=',`${idProd}`)
        .then((rows) => {
            prodFound = rows;
            // for (row of rows) {
            //     console.log(`${row['id_prod']} ${row['name']} ${row['price']} ${row['image']} ${row['stock']}`);
            // }
        })
        .catch((err) => { console.log(err); throw err })
        .finally(() => { knex.destroy(); });
    }
    
    return prodFound;
}

module.exports = { selectProducto };