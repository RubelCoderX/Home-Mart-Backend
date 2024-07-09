import httpStatus from 'http-status'
import AppError from '../../error/AppError'
import { TProduct } from './product.interface'
import { Product } from './product.model'

const createProductIntoDB = async (payload: TProduct) => {
  const productName = payload.name
  const existProduct = await Product.findOne({ name: productName })
  if (existProduct) {
    throw new AppError(httpStatus.CONFLICT, 'this product already exists!')
  }
  const result = await Product.create(payload)
  return result
}
const getAllProductFromDB = async () => {
  const result = await Product.find()
  return result
}

const updateProductIntoDB = async (
  productId: string,
  payload: Partial<TProduct>,
) => {
  const product = await Product.findById(productId)
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not Found!!')
  }

  const updatedProduct = await Product.findByIdAndUpdate(productId, payload, {
    new: true,
  })
  return updatedProduct
}
const deleteProductFromDB = async (productId: string) => {
  const product = await Product.findById(productId)

  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not Found!!')
  }

  const result = await Product.findByIdAndUpdate(
    productId,
    { isDelete: true },
    { new: true },
  )
  return result
}
export const ProductService = {
  createProductIntoDB,
  getAllProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
}
