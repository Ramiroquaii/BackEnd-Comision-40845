//import { mongoose, set, connect } from "mongoose";
import mongoose from "mongoose";
import { optionsMongoDB } from '../config/config.js';

import Producto from '../DAOs/Productos/ProductoMongoDB.js';
import Carrito from '../DAOs/Carritos/CarritoMongoDB.js';

const productToAdd = [
    {
        name:"Producto1",
        description:"Producto de prueba.",
        photo:"https://rickandmortyapi.com/api/character/avatar/1.jpeg",
        price:99.2,
        stock:50
    }
];


try { 
    // Connect to the MongoDB cluster
    mongoose.set("strictQuery", false);

    mongoose.connect(
      optionsMongoDB,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log(" Mongoose is connected");
    
    Producto.create(productToAdd);
    Carrito.create({});
    //Producto.insertMany(productToAdd);
    //mongoose.connection.close();

  } catch (e) {
    console.log(e);
    console.log("could not connect");
  }