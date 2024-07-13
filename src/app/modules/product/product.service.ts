/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import AppError from '../../error/AppError'
import { TProduct } from './product.interface'
import { Product } from './product.model'

const createProductIntoDB = async (payload: TProduct) => {
  const product = payload.name
  const isExitsProduct = await Product.find({ product })
  if (isExitsProduct) {
    throw new AppError(httpStatus.CONFLICT, 'This Product already exists')
  }
  const result = await Product.create(payload)

  return result
}
const getAllProductFromDB = async (
  searchQuery: string,
  sortDirction: number,
) => {
  let query: any = {}

  if (searchQuery) {
    const searchRegex = new RegExp(searchQuery, 'i')
    query = {
      $or: [
        {
          name: searchRegex,
        },
        {
          description: searchRegex,
        },
      ],
    }
  }
  let sortCriteria: any = {}
  if (sortDirction === 0) {
    sortCriteria = {}
  } else if (sortDirction === 1) {
    sortCriteria = { price: 1 }
  } else if (sortDirction === -1) {
    sortCriteria = { price: -1 }
  }
  const result = await Product.find(query).sort(sortCriteria)
  return result
}
const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id)
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
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
}
