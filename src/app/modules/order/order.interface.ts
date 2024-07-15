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
  email: string
  phone: string
  address: string
  paymentMethod: 'cashOnDelivery'
  items: TCartItems[]
}
