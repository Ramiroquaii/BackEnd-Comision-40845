const { MongoClient, ServerApiVersion } = require('mongodb');

const { urlAtlas, mongoDBase } = require('../environment.js');

connectAtlas = () => {
    const client = new MongoClient(
        urlAtlas,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverApi: ServerApiVersion.v1
        }
    );
    return client;
}

const getAllProducts = async () => {
    const client = connectAtlas();
    const databaseAtlas = client.db(mongoDBase);
    const collectionProductos = databaseAtlas.collection("productos");

    let productos = [];
    try {
        const options = {
            sort: { name: 1 }, // sort returned documents in ascending order by name (A->Z).
            projection: { _id: 1, name: 1, price: 1, photo: 1 }, // Include only fields in document.
        };
        const cursorAtlas = await collectionProductos.find({}, options);

        if ((await cursorAtlas.countDocuments) === 0) {
            productos.push({ error: "NO EXISTEN PRODUCTOS EN LA BASE" });
        } else {
            await cursorAtlas.forEach(element => productos.push(element));
        }
    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
    return productos;
};

const getProductByName = async (prodName) => {
    const client = connectAtlas();
    const databaseAtlas = client.db(mongoDBase);
    const collectionProductos = databaseAtlas.collection("productos");

    let producto = [];
    try {
        const query = { name: prodName };
        const result = await collectionProductos.findOne(query);
        if (result == null) {
            producto.push({ error: `NO EXISTE ${prodName} EN LA BASE` });
        } else {
            producto.push(result);
        }
    }catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
    return producto;
};

const addProduct = async (newProduct) => {
    const client = connectAtlas();
    const databaseAtlas = client.db(mongoDBase);
    const collectionProductos = databaseAtlas.collection("productos");
    let response = null;
    try {
        const cursorAtlas = await collectionProductos.insertOne(newProduct)
            if (cursorAtlas.acknowledged == false) {
                response = { estado: 1, mensaje: `ERROR INESPERADO - INTENTE NUEVAMENTE` };
                console.log(response);
            }
            if (cursorAtlas.acknowledged == true) {
                response = { estado: 0, mensaje: `PRODUCTO INSERTADO`, producto: { id: cursorAtlas.insertedId, ...newProduct } };
                console.log(response);
            }
    }catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
    return response;
};


const updateProductById = async (prodId) => {

};
const deleteProductById = async (prodId) => {

};



module.exports = { getAllProducts, getProductByName, addProduct };