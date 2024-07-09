import httpStatus from "http-status";
import AppError from "../../Error/AppError";
import { TProducts } from "./product.interface";
import { Product } from "./product.model";

// created product
const createProductIntoDB = async (payload: TProducts) => {
  return await Product.create(payload);
};
// get product
const getAllProductFromDB = async () => {
  return await Product.find().populate("category");
};
// get product
const getSingleProductFromDB = async (id: string) => {
  const isProduct = await Product.findById(id);
  if (!isProduct) {
    throw new AppError(httpStatus.NOT_FOUND, "product not found");
  }
  return await Product.findById(id).populate("category");
};

// product update
const updateProductIntoDB = async (id: string, payload: Partial<TProducts>) => {
  const isExistsProduct = await Product.findById(id);
  if (!isExistsProduct) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found!");
  }

  return await Product.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
};

// product deleted
const deleteProductFromDB = async (id: string) => {
  const isExistsProduct = await Product.findById(id);
  if (!isExistsProduct) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found!");
  }

  return await Product.findByIdAndDelete(id);
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
};
