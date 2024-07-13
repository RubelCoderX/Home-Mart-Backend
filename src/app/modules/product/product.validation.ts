// product.validation.ts
import { z } from 'zod'

const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string().nonempty({ message: 'Name is required' }),
    price: z.number().positive({ message: 'Price must be a positive number' }),
    category: z.string().nonempty({ message: 'Category is required' }),
    description: z.string().nonempty({ message: 'Description is required' }),
    stock: z
      .number()
      .int()
      .nonnegative({ message: 'Stock must be a non-negative integer' }),
    rating: z
      .number()
      .min(0)
      .max(5, { message: 'Rating must be between 0 and 5' }),
    images: z.string().url({ message: 'Each image must be a valid URL' }),
  }),
})
const updateValidationSchema = z.object({
  body: z.object({
    name: z.string().nonempty({ message: 'Name is required' }).optional(),
    price: z
      .number()
      .positive({ message: 'Price must be a positive number' })
      .optional(),
    category: z
      .string()
      .nonempty({ message: 'Category is required' })
      .optional(),
    description: z
      .string()
      .nonempty({ message: 'Description is required' })
      .optional(),
    stock: z
      .number()
      .int()
      .nonnegative({ message: 'Stock must be a non-negative integer' })
      .optional(),
    rating: z
      .number()
      .min(0)
      .max(5, { message: 'Rating must be between 0 and 5' })
      .optional(),
    images: z
      .string()
      .url({ message: 'Each image must be a valid URL' })
      .optional(),
  }),
})

export const productValidationSchema = {
  createProductValidationSchema,
  updateValidationSchema,
}
