import { z } from 'zod'

const orderValidationSchema = z.object({
  body: z.object({
    name: z.string().nonempty({ message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    phone: z
      .number()
      .nonnegative({ message: 'Phone number must be non-negative' }),
    address: z.string().nonempty({ message: 'Address is required' }),
    paymentMethod: z.enum(['cashOnDelivery'], {
      message: 'Invalid payment method',
    }),
  }),
})

export const OrderValidation = {
  orderValidationSchema,
}
