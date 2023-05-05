import { Schema, model } from "mongoose";

const carritoSchema = new Schema({
    timeStamp: { type: Date, default: Date.now },
    productos: { type: Array, default: [] }
});

const Carrito = model('Carrito', carritoSchema);

export default Carrito;