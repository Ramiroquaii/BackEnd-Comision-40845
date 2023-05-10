const Koa = require('koa');
const { koaBody } = require('koa-body');
const productsRouter = require('./routes/productRouter.js')
const { serverPort } = require('./environment.js');


//  inizialization
const app = new Koa();

// middlewares
app.use(koaBody());

// routes
app.use(productsRouter.routes());

// starting server
app.listen(serverPort, () => console.log(`Ready! - Server KOA in port: ${serverPort}`));