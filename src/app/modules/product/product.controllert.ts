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
  const { search, sort, category } = req.query
  const result = await ProductService.getAllProductFromDB(
    search as string,
    parseInt(sort as string),
    category as string,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product are retrieved successfully!',
    data: result,
  })
})
const getSingleProduct = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await ProductService.getSingleProductFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is retrieved successfully!',
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
  getSingleProduct,
  updateProduct,
  deleteProduct,
}
