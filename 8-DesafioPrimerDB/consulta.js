const { insertProducto } = require('./SQL-Querys/insert_product.js');

const { selectProducto } = require('./SQL-Querys/select_product.js');

const prod = 
    {"name":"Cualquier Cosa","price":8888,"image":"https://","stock":2}
;

// insertProducto(prod);

select = async (param) => {
    const result = await selectProducto(param);

    result.forEach(element => {
        console.log(element.name);
    });
}

select('ALL');






