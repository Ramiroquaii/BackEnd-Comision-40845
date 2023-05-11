export type ProductToAdd = {
  name: string;
  price: number;
  image: string;
  stock: number;
}

export type Product = ProductToAdd & {
  _id: { $oid: string },
};