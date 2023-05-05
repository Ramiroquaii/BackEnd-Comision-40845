const { options } = require('../dbOptions/sqlite3');
const knex = require('knex')(options);

async function selectMensaje(idMsg) {
    let msgFound = [];

    if(idMsg == "ALL"){
        await knex.from('mensajes').select('*')
            .then((rows) => {
                msgFound = rows;
                // for (row of rows) {
                //     console.log(`${row['id_prod']} ${row['name']} ${row['price']} ${row['image']} ${row['stock']}`);
                // }
            })
            .catch((err) => { console.log(err); throw err })
            .finally(() => { knex.destroy(); });
    } else {
        await knex.from('mensajes').select('*').where('id_msg','=',`${idMsg}`)
        .then((rows) => {
            msgFound = rows;
            // for (row of rows) {
            //     console.log(`${row['id_prod']} ${row['name']} ${row['price']} ${row['image']} ${row['stock']}`);
            // }
        })
        .catch((err) => { console.log(err); throw err })
        .finally(() => { knex.destroy(); });
    }

    return msgFound;
}

module.exports = { selectMensaje };