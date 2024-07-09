import express from "express";
import { CategoryControllers } from "./category.controller";

const CategoryRouter = express.Router();

CategoryRouter.post("/create-category", CategoryControllers.createCategory);
CategoryRouter.get("/", CategoryControllers.getAllCategory);
CategoryRouter.get("/:categoryId", CategoryControllers.getSingleCategory);
CategoryRouter.patch("/:categoryId", CategoryControllers.updateCategory);
CategoryRouter.delete("/:categoryId", CategoryControllers.deleteCategory);

export default CategoryRouter;
