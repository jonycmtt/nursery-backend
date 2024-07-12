import httpStatus from "http-status";
import AppError from "../../Error/AppError";
import { Product } from "../products/product.model";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrderIntoDB = async (payload: TOrder) => {
  const { productId, quantity } = payload;

  // Fetch the product to check inventory
  const findProduct = await Product.findById(productId);
  if (!findProduct) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }

  if (findProduct.quantity < quantity) {
    throw new Error("Insufficient quantity available in inventory");
  }
  // Create the order
  const createOrder = new Order(payload);
  await createOrder.save();

  // Update the product inventory
  findProduct.quantity -= quantity;
  findProduct.inStock = findProduct.quantity > 0;
  await findProduct.save();

  return createOrder;
};

// get all orders
const getAllOrdersFromDB = async () => {
  const result = await Order.find();
  return result;
};
export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
};
