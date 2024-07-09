import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProductServices } from "./product.services";

// create product
const createProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.createProductIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product successfully created ",
    data: result,
  });
});

// get all Products
const getAllProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.getAllProductFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product successfully find ",
    data: result,
  });
});
// get single Products
const getSingleProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await ProductServices.getSingleProductFromDB(productId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single Product successfully find ",
    data: result,
  });
});

export const ProductControllers = {
  createProduct,
  getAllProduct,
  getSingleProduct,
};
