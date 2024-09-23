import { Types } from 'mongoose'

type TCartItems = {
  _id?: string
  name: string
  price: number
  category: string
  description: string
  stock: number
  rating: number
  images: string
  quantity: number
}
export type TOrder = {
  name: string
  totalAmount: string
  user: Types.ObjectId
  email: string
  phone: string
  address: string
  paymentMethod: 'cashOnDelivery' | 'online-payment'
  items: TCartItems[]
}
