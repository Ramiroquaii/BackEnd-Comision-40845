const { MongoClient, ServerApiVersion } = require('mongodb');

const { urlAtlas, mongoDBase } = require('../environment.js');

function connectAtlas() {
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


const getProductos = async () => {
    const client = connectAtlas();
    const databaseAtlas = client.db(mongoDBase);
    const collectionProductos = databaseAtlas.collection("productos");

    let productos = [];
    try {
        const options = {
            sort: { name: 1 }, // sort returned documents in ascending order by name (A->Z).
            projection: { _id: 1, name: 1, price: 1, photo: 1 }, // Include only fields in document.
        };
        const cursorAtlas = collectionProductos.find({}, options);

        if ((await cursorAtlas.countDocuments) === 0) {
            productos.push({ error: "NO EXISTEN PRODUCTOS EN LA BASE" });
        } else {
            await cursorAtlas.forEach(element => productos.push(element));
        }
    } catch (error) {
        productos.push({ error: "HUBO UN INCONVENIENTE" });
    } finally {
        await client.close();
    }
    return productos;
};

const getProductoByName = async (prodName) => {
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
    } catch (error) {
        productos.push({ error: "HUBO UN INCONVENIENTE" });
    } finally {
        await client.close();
    }
    return producto;
}

const updateProductPrice = async (prodName, newPrice) => {
    const client = connectAtlas();
    const databaseAtlas = client.db(mongoDBase);
    const collectionProductos = databaseAtlas.collection("productos");

    let producto = [];
    try {
        const filter = { name: prodName };
        const updateDoc = { $set: { price: newPrice } };
        const result = await collectionProductos.updateOne(filter, updateDoc);
        producto.push({ message: `UPDATE DONE TO ${prodName} NEW PRICE: ${newPrice}` });
    } catch (error) {
        producto.push({ message: "HUBO UN INCONVENIENTE" });
    } finally {
        await client.close();
    }
    return producto;
}

const updateProductPrice2 = async (prodName, newPrice) => {
    const client = connectAtlas();
    const databaseAtlas = client.db(mongoDBase);
    const collectionProductos = databaseAtlas.collection("productos");

    let producto;
    try {
        const filter = { name: prodName };
        const updateDoc = { $set: { price: newPrice } };
        const result = await collectionProductos.updateOne(filter, updateDoc);
        producto = { message: `UPDATE DONE TO ${prodName} NEW PRICE: ${newPrice}` };
    } catch (error) {
        producto = { message: "HUBO UN INCONVENIENTE" };
    } finally {
        await client.close();
    }
    return producto;
}


module.exports = {
    getProductos, getProductoByName, updateProductPrice, updateProductPrice2
};