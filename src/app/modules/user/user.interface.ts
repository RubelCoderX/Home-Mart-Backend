/* eslint-disable no-unused-vars */
import { Model } from 'mongoose'
import { USER_ROLES } from './user.constant'

export type IUser = {
  name: string
  email: string
  password: string
  photoUrl: string
  address: string
  role: 'user' | 'seller'
}

//static method
export interface UserModel extends Model<IUser> {
  isUserExitsByEmail(email: string): Promise<IUser>
  isPasswordMatched(
    // eslint-disable-next-line no-unused-vars
    palinTextPassword: string,
    hashedTextPassword: string,
  ): Promise<boolean>
}
export type TUserRole = keyof typeof USER_ROLES
