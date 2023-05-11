import { ObjectId } from "https://deno.land/x/mongo@v0.31.2/mod.ts";
import { mongoUri } from "../config/environment.ts";
import { MongoClient } from "../deps.ts";
import { Product, ProductToAdd } from "../types/products.ts";

const client = new MongoClient();

try {
  await client.connect(mongoUri);
  console.log("Connected to Mongo");
} catch (err) {
  console.error(err);
}

const db = client.database();
const productsCollection = db.collection<Product>("productos");

export const listProductsController = async () => {
  const products = await productsCollection.find({}).toArray();
  return products;
};

export const addProductController = async (product: ProductToAdd) => {
  const _id = await productsCollection.insertOne(product)

  return {
    ...product,
    _id,
  };
};

export const updateProductController = async (productId, newParams) => {

  const filter = { _id: new ObjectId(productId) };
  const update = { $set: { name: newParams.name, price: newParams.price, image: newParams.image, stock: newParams.stock } };

  const objUpdates = await productsCollection.updateOne(filter, update);

  if (objUpdates.matchedCount == 1 && objUpdates.modifiedCount == 1) {
    return {msg: `Actualizado Producto ID: ${productId}`};
  } else {
    return {error: `Producto: ${productId} sin cambios.`};
  }
};

export const deleteProductController = async (id) => {
  const result = await productsCollection.deleteOne({_id: new ObjectId(id) });
  if (result) {
    return { msg: `Producto ID: ${id} ELIMINADO` };
  } else {
    return { error: `No fue posible eliminar producto !!` };
  }
};

export const findProductController = (productId: string) => {
  const result = productsCollection.findOne({ _id: new ObjectId(productId) });
  return result;
};
