import { model, Schema } from 'mongoose'
import { IUser, UserModel } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../config'

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  photoUrl: { type: String, required: true },
  address: { type: String, required: true },
  role: { type: String, default: 'user', enum: ['user', 'seller'] },
})

// hashed the password field
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  )

  next()
})
// Static method to check if a user exists by
userSchema.statics.isUserExitsByEmail = async function (email: string) {
  return await User.findOne({ email })
}
// Static method to check if a user exists by
userSchema.statics.isUserExitsByEmail = async function (email: string) {
  return await User.findOne({ email })
}
// Static method to check if the password matches
userSchema.statics.isPasswordMatched = async function (
  palinTextPassword,
  hashedTextPassword,
) {
  return await bcrypt.compare(palinTextPassword, hashedTextPassword)
}
export const User = model<IUser, UserModel>('user', userSchema)
