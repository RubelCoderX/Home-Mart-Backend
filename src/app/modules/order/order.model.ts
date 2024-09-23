import { model, Schema } from 'mongoose'
import { TOrder } from './order.interface'

const CartItemSchema = new Schema({
  _id: { type: String, required: false },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  stock: { type: Number, required: true },
  rating: { type: Number, required: true },
  images: { type: String, required: true },
  quantity: { type: Number, required: true },
})
const OrderSchema = new Schema<TOrder>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  paymentMethod: {
    type: String,
    enum: ['cashOnDelivery', 'online-payment'],
    required: true,
  },
  items: {
    type: [CartItemSchema],
    required: true,
  },
  totalAmount: {
    type: String,
    default: '0',
  },
})

export const Order = model<TOrder>('Order', OrderSchema)
