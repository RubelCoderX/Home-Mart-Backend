import { z } from 'zod'

const CreateAuthValidation = z.object({
  body: z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' }),
    name: z.string().nonempty({ message: 'Name is required' }),
    address: z.string().nonempty({ message: 'Address is required' }),
    photoUrl: z.string().nonempty({ message: 'Photo URL is required' }),
  }),
})

const LoginAuthValidation = z.object({
  body: z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' }),
  }),
})
const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
})
export const AuthValidation = {
  CreateAuthValidation,
  LoginAuthValidation,
  refreshTokenValidationSchema,
}
