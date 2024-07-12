/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../Error/AppError";
import { TProducts } from "./product.interface";
import { Product } from "./product.model";
import { productSearchableFields } from "./product.constant";

// created product
const createProductIntoDB = async (payload: TProducts) => {
  return await Product.create(payload);
};
// get product
const getAllProductFromDB = async (query: Record<string, unknown>) => {
  // console.log(query);
  // const queryObj: any = { ...query };

  // let searchTerm = "";
  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }
  // // search
  // const searchQuery = Product.find({
  //   $or: productSearchableFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: "i" },
  //   })),
  // });

  // // filter
  // const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];
  // excludeFields.forEach((field) => delete queryObj[field]);

  // console.log(queryObj);
  // if (query?.minPrice || query?.maxPrice) {
  //   queryObj.price = {};
  //   if (query?.minPrice) queryObj.price.$gte = Number(query?.minPrice);
  //   if (query?.maxPrice) queryObj.price.$gte = Number(query?.maxPrice);
  // }
  // const filterQuery = searchQuery.find(queryObj);
  // console.log(filterQuery);

  // const result = await filterQuery;
  // return result;

  try {
    const {
      // page = 1,
      // limit = 10,
      sort = "createdAt",
      order = "desc",
      search = "",
      minPrice,
      maxPrice,
      category,
    } = query;

    const queryField: any = {};

    if (search) {
      // search

      queryField.$or = productSearchableFields.map((field) => ({
        [field]: { $regex: search, $options: "i" },
      }));
    }

    // filter
    if (minPrice || maxPrice) {
      queryField.price = {};
      if (minPrice) queryField.price.$gte = Number(minPrice);
      if (maxPrice) queryField.price.$lte = Number(maxPrice);
    }

    if (category) {
      queryField.category = category;
    }

    // sorting
    const sortValue: any = {};
    // Set default sorting option
    if (!sort) {
      sortValue.createdAt = -1;
    } else {
      // Handle different sorting options
      switch (sort.toString().toLowerCase()) {
        case "title":
          sortValue.title = order === "desc" ? -1 : 1;
          break;
        case "price":
          sortValue.price = order === "desc" ? -1 : 1;
          break;

        case "relevance":
          if (search) {
            sortValue.score = { $meta: "textScore" };
          }
          break;

        default:
          sortValue.createdAt = order === "desc" ? -1 : 1;
          break;
      }
    }

    const result = await Product.find(queryField).sort(sortValue);
    return result;
  } catch (error) {
    throw new AppError(httpStatus.NOT_FOUND, "not found");
  }
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
