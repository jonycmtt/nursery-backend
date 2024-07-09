import cors from "cors";
import express, { Application, Request, Response } from "express";
import httpStatus from "http-status";
import router from "./app/modules/products/product.route";
import CategoryRouter from "./app/modules/category/category.route";

const app: Application = express();
//  parser
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/products", router);
app.use("/api/categories", CategoryRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({
    success: true,
    message: "👌Server is Running!",
  });
});

export default app;
