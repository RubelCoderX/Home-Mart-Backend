import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { ProductService } from './product.service'

const createProduct = catchAsync(async (req, res) => {
  const result = await ProductService.createProductIntoDB(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is created Successfully',
    data: result,
  })
})

const getAllProduct = catchAsync(async (req, res) => {
  const result = await ProductService.getAllProductFromDB()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product are retrieved successfully!',
    data: result,
  })
})
const updateProduct = catchAsync(async (req, res) => {
  const productId = req.params.id
  const result = await ProductService.updateProductIntoDB(productId, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product updated is Successfully!!',
    data: result,
  })
})
const deleteProduct = catchAsync(async (req, res) => {
  const productId = req.params.id
  const result = await ProductService.deleteProductFromDB(productId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is deleted Successfully!!',
    data: result,
  })
})
export const ProductController = {
  createProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
}
