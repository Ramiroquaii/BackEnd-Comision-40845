import { addProductController, findProductController, listProductsController, updateProductController, deleteProductController } from "../controllers/products.ts";
import { Context, helpers } from "../deps.ts";

export const findProduct = async (ctx: Context) => {
  const { productId } = helpers.getQuery(ctx, { mergeParams: true });
  const product = await findProductController(productId);

  if (!product) {
    ctx.response.status = 404;
    return;
  }

  ctx.response.body = product;
};

export const listProducts = async (ctx: Context) => {
  ctx.response.body = await listProductsController();
};

export const createProduct = async (ctx: Context) => {
  const { name, price } = await ctx.request.body().value;
  const product = await addProductController({name, price});
  ctx.response.body = product;
  ctx.response.status = 201;
};

export const updateProduct = async (ctx: Context) => {
  const { productId } = helpers.getQuery(ctx, { mergeParams: true });
  const product = await findProductController(productId);

  if (!product) {
    ctx.response.status = 404;
    return;
  } else {
    const { name, price, image, stock } = await ctx.request.body().value;
    const updateValues = { name: name, price: price, image: image, stock: stock };
    
    const updated = await updateProductController(productId, updateValues);
    
    ctx.response.body = updated;
    ctx.response.status = 201;
  }
};

export const deleteProduct = async (ctx: Context) => {
  const { id } = await ctx.request.body().value;

  const deleted = await deleteProductController(id);
    
  ctx.response.body = deleted;
  ctx.response.status = 201;
};
