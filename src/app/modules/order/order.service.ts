import { Product } from '../product/product.model'
import { TOrder } from './order.interface'

const getOrderIntoDB = async (payload: TOrder) => {
  const updatedProducts = []

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
  }

  return updatedProducts
}

export const OrderService = {
  getOrderIntoDB,
}
