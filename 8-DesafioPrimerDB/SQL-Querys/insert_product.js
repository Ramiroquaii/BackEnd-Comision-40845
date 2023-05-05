const { options } = require('../dbOptions/mariaDB.js');
const knex = require('knex')(options);

const { existeProducto } = require('../SQL-Querys/exist_product.js')

// Formato del objeto producto para insertar.
// El ID es autoincremental y el campo es id_prod.
// Se chequea que no pueda ser agregado un producto de igual nombre, si el nombre no existe se agrega.
// [
//   {"name":"Abradolf Lincler","price":100,"image":"https://rickandmortyapi.com/api/character/avatar/7.jpeg","stock":100},
// ];

insertProducto = async (newProduct) => {
    const existe = await existeProducto(newProduct.name); // Si el key name del objeto se repite el la BD no se agrega nuevamente.

    if (existe === 0) {
        await knex('productos').insert(newProduct)
            .then(() => console.log(`Producto Insertado: ${JSON.stringify(newProduct)}`))
            .catch((err) => { console.log(err); throw err; })
            .finally(() => { knex.destroy(); })
    } else {
        console.log('YA EXISTE EL PRODUCTO - NO SE PUEDE VOLVER A CARGAR');
    }
}

module.exports = { insertProducto };




// ALTER TABLE tablename AUTO_INCREMENT = 0;    reseteo de indice de tabla.
