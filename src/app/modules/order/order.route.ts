import express from "express";
import { OrderControllers } from "./order.controller";

const OrderRouter = express.Router();

OrderRouter.post("/create-order", OrderControllers.createOrder);
OrderRouter.get("/", OrderControllers.getOrder);

export default OrderRouter;
