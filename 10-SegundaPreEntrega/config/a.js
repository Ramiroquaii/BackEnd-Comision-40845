import path from "path";
import { fileURLToPath } from 'url';


const abs = new URL('../DAOs/Productos/ProductoMongoDB.js', import.meta.url);

const zzz =  fileURLToPath(abs);

const xxx = path.dirname(zzz);

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);



console.log(__filename);
console.log(__dirname);
console.log(xxx);