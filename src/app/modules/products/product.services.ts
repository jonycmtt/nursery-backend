import { TProducts } from "./product.interface";
import { Product } from "./product.model";

// created product
const createProductIntoDB = async (payload: TProducts) => {
  return await Product.create(payload);
};
// get product
const getAllProductFromDB = async () => {
  return await Product.find();
};
// get product
const getSingleProductFromDB = async (id: string) => {
  return await Product.findById(id);
};

//product update
// const updateProudctIn

export const ProductServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
};
