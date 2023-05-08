const atlasDB = require("../dao/productosMongoAtlas");

const mapProducto = (producto) => ({
    idProd: producto._id,
    nombre: producto.name,
    precio: producto.price,
    foto: producto.photo
});

const getProducto = async (name) => {
    const prod = await atlasDB.getProductByName(name);
    return mapProducto(prod);
};

const getProductos = async () => {
    const prods = await atlasDB.getAllProducts();
    return prods.map(prod => mapProducto(prod));
};

const addProducto = async (producto) => {
    const agregado = atlasDB.addProduct(producto);
    return mapProducto(agregado);
};


module.exports = { getProducto, getProductos, addProducto }