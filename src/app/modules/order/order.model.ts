import { model, Schema } from 'mongoose'
import { TOrder } from './order.interface'

const OrderSchema = new Schema<TOrder>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  paymentMethod: { type: String, enum: ['cashOnDelivery'], required: true },
  cartItems: {
    type: [Object],
    required: true,
  },
})

export const Order = model<TOrder>('Order', OrderSchema)
