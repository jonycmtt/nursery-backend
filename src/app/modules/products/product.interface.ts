import { Types } from "mongoose";

export type TProducts = {
  title: string;
  brand: string;
  price: number;
  description: string;
  rating: number;
  category: Types.ObjectId;
  imageUrl: string;
};
