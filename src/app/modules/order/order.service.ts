import httpStatus from 'http-status'
import AppError from '../../error/AppError'
import { Product } from '../product/product.model'
import { User } from '../user/user.model'
import { TOrder } from './order.interface'
import { Order } from './order.model'

const createOrderIntoDB = async (payload: TOrder, id: string) => {
  const userData = await User.findOne({ _id: id })

  if (!userData) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found')
  }

  if (userData) {
    payload.user = userData?._id
  }

  const updatedProducts = []
  let totalAmount = 0

  // Calculate totalAmount based on item price and quantity
  for (const item of payload.items) {
    const productId = item._id
    const orderQuantity = item.quantity

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $inc: { stock: -orderQuantity } },
      { new: true },
    )

    if (!updatedProduct) {
      throw new Error(`Product not found with ID: ${productId}`)
    }

    updatedProducts.push(updatedProduct)

    // Add the item's total (price * quantity) to the totalAmount
    totalAmount += item.price * orderQuantity
  }

  // Update payload with calculated totalAmount
  payload.totalAmount = totalAmount.toFixed(2)

  const order = await Order.create(payload)

  return {
    order,
    updatedProducts,
  }
}

const getAllOrders = async () => {
  const orders = await Order.find().populate('user').populate('items')
  return orders
}
const getMyOrder = async (id: string) => {
  const user = await User.findOne({ _id: id })
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found')
  }
  const orders = await Order.find({ user: user._id })
    .populate('items')
    .populate('user')

  if (!orders.length) {
    throw new AppError(httpStatus.NOT_FOUND, 'No orders found for this user')
  }
  return orders
}
export const OrderService = {
  createOrderIntoDB,
  getAllOrders,
  getMyOrder,
}
