import { model, Schema } from 'mongoose'
import { TProduct } from './product.interface'

const ProductSchema = new Schema<TProduct>({
  name: {
    type: String,
    required: [true, 'TProduct name is required'],
  },
  category: {
    type: String,
    required: [true, 'Category name is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is must be required'],
  },
  stock: {
    type: Number,
    required: [true, 'Stock is required'],
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
  images: {
    type: [String],
    required: [true, 'Images is required'],
  },
})

export const Product = model<TProduct>('Product', ProductSchema)
