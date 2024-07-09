import cors from "cors";
import express, { Application, json, Request, Response } from "express";
import httpStatus from "http-status";
import router from "./app/modules/products/product.route";

const app: Application = express();
//  parser
app.use(express.json());
app.use(cors());

// application route
app.use("/api/products", router);

app.get("/", (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({
    success: true,
    message: "👌Server is Running!",
  });
});

export default app;
