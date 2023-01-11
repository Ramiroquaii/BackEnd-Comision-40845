/* 
>> Consigna: Deberás entregar el estado de avance de tu aplicación eCommerce Backend,
que implemente un servidor de aplicación basado en la plataforma Node.js y el módulo express.
El servidor implementará dos conjuntos de rutas agrupadas en routers, uno con la url base '/products' y el otro con '/cart'.
El puerto de escucha será el 8080 para desarrollo y process.env.PORT para producción en glitch.com

>> Aspectos a incluir en el entregable: 
1. El router base '/api/products' implementará cuatro funcionalidades:
    a. GET: '/:id?' - Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores).
    b. POST: '/' - Para incorporar productos al listado (disponible para administradores).
    c. PUT: '/:id' - Actualiza un producto por su id (disponible para administradores).
    d. DELETE: '/:id' - Borra un producto por su id (disponible para administradores).

2. El router base '/api/cart' implementará tres rutas disponibles para usuarios y administradores:
    a. POST: '/' - Crea un carrito y devuelve su id.
    b. DELETE: '/:id' - Vacía un carrito y lo elimina.
    c. GET: '/:id/products' - Me permite listar todos los productos guardados en el carrito.
    d. POST: '/:id/products/:id_prod' - Para incorporar productos al carrito por su id de producto.
    e. DELETE: '/:id/products/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto.

3. Crear una variable booleana administrador, cuyo valor configuraremos más adelante con el sistema de login.
Según su valor (true ó false) me permitirá alcanzar o no las rutas indicadas. En el caso de recibir un request a una ruta no permitida por el perfil, devolver un objeto de error.
El status http de la respuesta debe ser 403. Ejemplo: { error : -1, descripcion: ruta 'x' método 'y' no autorizada }

5. Un producto dispondrá de los siguientes campos: id, timestamp, nombre, descripcion, código, foto (url), precio, stock.
6. El carrito de compras tendrá la siguiente estructura: id, timestamp(carrito), productos: { id, timestamp(producto), nombre, descripcion, código, foto (url), precio, stock }
7. El timestamp puede implementarse con Date.now()
8. Realizar la persistencia de productos y del carrito de compras en el filesystem.

>> A tener en cuenta:
1. Para realizar la prueba de funcionalidad hay dos opciones:
    a. Probar con postman cada uno de los endpoints (products y cart) y su operación en conjunto.
    b. Realizar una aplicación frontend sencilla, utilizando HTML/CSS/JS ó algún framework de preferencia, que represente el listado de productos en forma de cards.
    En cada card figuran los datos del producto, que, en el caso de ser administradores, podremos editar su información.
    Para este último caso incorporar los botones actualizar y eliminar. También tendremos un formulario de ingreso de productos nuevos con los campos correspondientes y un botón enviar.
    Asimismo, construir la vista del carrito donde se podrán ver los productos agregados e incorporar productos a comprar por su id de producto. Esta aplicación de frontend debe enviar los requests get, post, put y delete al servidor utilizando fetch y debe estar ofrecida en su espacio público.

2. En todos los casos, el diálogo entre el frontend y el backend debe ser en formato JSON. El servidor no debe generar ninguna vista.
3. En el caso de requerir una ruta no implementada en el servidor, este debe contestar un objeto de error: ej { error : -2, descripcion: ruta 'x' método 'y' no implementada}
4. La estructura de programación será ECMAScript, separada tres en módulos básicos (router, lógica de negocio/api y persistencia ). Más adelante implementaremos el desarrollo en capas.
   Utilizar preferentemente clases, constructores de variables let y const y arrow function.
5. Realizar la prueba de funcionalidad completa en el ámbito local (puerto 8080) y en glitch.com
*/

const Container = require('./productContainer.js');
const productsList = new Container('products');

const cartContainer = require('./cartContainer.js');
const cartList = new cartContainer('cart');

const express = require('express');

const { Router } = express;

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const productsRouter = Router();
app.use('/api/products', productsRouter);

const cartRouter = Router();
app.use('/api/cart', cartRouter);

// -- 3. Declaracion de variable administrados activo o inactivo (true / false) para evaluar la ejecuciono no de las ruras.
const administrator = true

app.get('/*', async (req, res) =>{
    res.status(403).send({ error : -1, descripcion: 'Ruta erronea !!' });
});
app.put('/*', async (req, res) =>{
    res.status(403).send({ error : -1, descripcion: 'Ruta erronea !!' });
});
app.post('/*', async (req, res) =>{
    res.status(403).send({ error : -1, descripcion: 'Ruta erronea !!' });
});
app.delete('/*', async (req, res) =>{
    res.status(403).send({ error : -1, descripcion: 'Ruta erronea !!' });
});

// ------------- RUTA api/products ------------------------------------------

// --- 1a. GET: '/:id?' - Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores).
productsRouter.get('/', async (req, res) =>{
    const products = await productsList.getAll();
    res.json(products);
});

productsRouter.get('/:id', async (req, res) =>{
    const productId = req.params.id;
    if (isNaN(productId)) {
        res.status(400).send(`El ID ingresado: ${productId} no es un número !!`);
        return;
    }
    let products = await productsList.getById(Number(productId));
    res.json(products);
});

// --- 1b. POST: '/' - Para incorporar productos al listado (disponible para administradores) - Retorna ID den nuevo producto.
productsRouter.post('/', async (req, res) => {
    const product = req.body;
    
    if (!administrator) {
        res.status(403).send({ error : -1, descripcion: 'Ruta "./api/products" con método "POST" no autorizada.' });
        return;
    }
    
    const id = await productsList.save(product);
    res.send(id.toString());        
});

// --- 1c. PUT: '/:id' - Actualiza un producto por su id (disponible para administradores) - Retorna el producto actualizado.
productsRouter.put('/:id', async (req, res) => {
    const productId = req.params.id;
    if (!administrator) {
        res.status(403).send({ error : -1, descripcion: 'Ruta "./api/products" con método "PUT" no autorizada.' });
        return;
    }

    let products = await productsList.getById(Number(productId));

    if (products == null || productId <=0 || isNaN(productId)) {
        res.status(403).send({ error : -1, descripcion: `El producto no fue encontrado o se indico mal su ID: ${productId}` });
        return;
    } else {
        let selectProduct = req.body;
        await productsList.updateById(Number(productId), selectProduct);
        res.json(selectProduct);
    };
});

// --- 1d. DELETE: '/:id' - Borra un producto por su id (disponible para administradores) - Retorna el producto eliminado.
productsRouter.delete('/:id', async (req, res) =>{
    const productId = req.params.id;
    if (!administrator) {
        res.status(403).send({ error : -1, descripcion: 'Ruta "./api/products/:id" con método "DELETE" no autorizada.' });
        return;
    }
    const products = await productsList.deleteById(Number(productId));
    res.json(products);
});

// *************************************************************************************************************************** //

// ------------- RUTA api/cart ------------------------------------------

// --- 2a. POST: '/' - Crea un carrito vacio y devuelve su id.
cartRouter.post('/', async (req, res) => {
    const cart = req.body;
    const id = await cartList.addCart(cart);
    res.send(id.toString());        
});

// --- 2b. DELETE: '/:id' - Vacía un carrito y lo elimina.
cartRouter.delete('/:id', async (req, res) => {
    const carttId = req.params.id;
    const cartDeleted = await cartList.deleteById(Number(carttId));
    if(cartDeleted != null){
        res.json(cartDeleted); 
    } else {
        res.status(403).send({ error : -1, descripcion: `ID: ${carttId} de carrito a eliminar inexistente` }); 
    }
});

// --- 2c. GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito.
cartRouter.get('/:id/products', async (req, res) =>{
    const cartId = req.params.id;
    const cart = await cartList.getCartById(Number(cartId));

    if (cart != null) {
        const arrayProducts = cart.productos;
        res.json(arrayProducts);
    } else {
        res.status(400).send(`No se encontro el carrito con ID: ${cartId}`);
    }
});

// --- 2d. POST: '/:id/productos/:id_prod' - Para incorporar productos al carrito por su id de producto.
cartRouter.post('/:id/products/:id_prod', async (req, res) => {
    const cartId = req.params.id;
    const prodId = req.params.id_prod;

    const cart = await cartList.getCartById(Number(cartId));
    if (cart == null) {
        res.status(400).send(`No se encontro el carrito con ID: ${cartId}`);
        return;
    }

    const product = await productsList.getById(Number(prodId));
    if (product == null){
        res.status(400).send(`No se encontro producto para agrgar con ID: ${prodId}`);
        return;
    }
    
    let prodInCart = cart.productos;
    let indexItem = prodInCart.findIndex(element => element.id == prodId);

    if (indexItem == -1) {
        prodInCart.push(product);
        cart.productos = prodInCart;
        await cartList.updateCartById(cartId, cart);
        res.json(cart);
        return;
    } else {
        prodInCart[indexItem].stock = prodInCart[indexItem].stock + 1;
        cart.productos = prodInCart;
        await cartList.updateCartById(cartId, cart);
        res.json(cart);
        return;
    }
});

// --- 2e. DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto.
cartRouter.delete('/:id/products/:id_prod', async (req, res) => {
    const cartId = req.params.id;
    const prodId = req.params.id_prod;
    const cart = await cartList.getCartById(Number(cartId));
    if (cart == null) {
        res.status(400).send(`No se encontro el carrito con ID: ${cartId}`);
        return;
    }
    let prodInCart = cart.productos;
    let indexItem = prodInCart.findIndex(element => element.id == prodId);
    if (indexItem == -1) {
        res.status(400).send(`El producto con ID: ${prodId} no se encuentra en el carrito.`);
        return;
    } else {
        let deletedproduct = prodInCart.splice(indexItem, 1);
        cart.productos = prodInCart;
        await cartList.updateCartById(cartId, cart);
        res.json(cart);
        return;
    }
});

cartRouter.get('/:id', async (req, res) =>{
    const cartId = req.params.id;
    const cart = await cartList.getCartById(Number(cartId));

    if (cart != null) {
        res.json(cart);
    } else {
        res.status(400).send(`No se encontro el carrito con ID: ${cartId}`);
    }
});

cartRouter.get('/', async (req, res) =>{

    const cart = await cartList.getAll();

    if (cart != null) {
        res.json(cart);
    } else {
        res.status(400).send(`No se encontraron carritos !!`);
    }
});

// *************************************************************************************************************************** //

const PORT = 8080;
app.listen(PORT, () => console.log(`Listening in port ${PORT}`));


