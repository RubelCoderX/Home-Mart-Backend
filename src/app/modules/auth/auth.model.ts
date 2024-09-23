import { model, Schema } from 'mongoose'
import { TAuth } from './auth.interface'

const creatAutSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
})

export const AuthModel = model<TAuth>('auth', creatAutSchema)
