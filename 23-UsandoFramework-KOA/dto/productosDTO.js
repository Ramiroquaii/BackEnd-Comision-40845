const { getAllProducts, getProductByName, addProduct } = require("../dao/productosMongoAtlas");

// Elemplo de serializacion simplemente cambiando el idioma de los KEYs del ojeto para mostrarlos en español pero guardarlos en ingles en la base de datos.
const serialize = (producto) => ({
    name: producto.nombre,
    description: producto.descripcion,
    photo: producto.foto,
    price: producto.precio,
    stock: producto.stock
});

const unSerialize = (producto) => ({
    idProd: producto._id,
    nombre: producto.name,
    precio: producto.price,
    foto: producto.photo
});

const getProducto = async (name) => {
    const prod = await getProductByName(name);
    return unSerialize(prod[0]);
};

const getProductos = async () => {
    const prods = await getAllProducts();
    return prods.map(prod => unSerialize(prod));
};

const addProducto = async (producto) => {
    const agregado = addProduct(serialize(producto));
    return agregado;
};

module.exports = { getProducto, getProductos, addProducto }