const Router = require('@koa/router');
const { getProducto, getProductos, addProducto } = require('../dto/productosDTO.js');

const productsRouter = new Router({prefix: '/products'});

productsRouter.get('/', async (ctx) => {
    ctx.set('Connection', 'close');
    ctx.body = await getProductos();
});

productsRouter.get('/:name', async (ctx) => {
    const product = await getProducto(ctx.params.name);
    if (product){
        ctx.set('Connection', 'close');
        ctx.body = product;
    } else {
        ctx.status = 404;
    }
});

productsRouter.post('/', async (ctx) => {
    const productData = ctx.request.body;
    const product = await addProducto(productData);
    ctx.set('Connection', 'close');
    ctx.body = product;

});

module.exports = productsRouter;
