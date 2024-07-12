import { model, Schema } from "mongoose";
import { TInventory, TProducts } from "./product.interface";

// Define the Inventory schema
const inventorySchema = new Schema<TInventory>({
  quantity: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Boolean,
    required: true,
  },
});

const ProductCreateSchema = new Schema<TProducts>({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  inventory: {
    type: inventorySchema,
    required: true,
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  rating: {
    type: Number,
    required: [true, "Rating is required"],
    default: 0,
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  imageUrl: {
    type: String,
    required: [true, "imageUrl is required"],
  },
});

export const Product = model<TProducts>("Product", ProductCreateSchema);
