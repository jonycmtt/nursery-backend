import { model, Schema } from "mongoose";
import { TOrder } from "./order.interface";

const OrderSchema = new Schema<TOrder>({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  phoneNumber: { type: String, required: true },
  company: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  postCode: { type: String, required: true },
  county: { type: String, required: true },
});

export const Order = model<TOrder>("Order", OrderSchema);
