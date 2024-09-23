import httpStatus from 'http-status'
import AppError from '../../error/AppError'
import { JwtPayloadWithUserEmail, TAuth } from './auth.interface'

import { User } from '../user/user.model'
import jwt from 'jsonwebtoken'
import config from '../../config'

const signInUser = async (payload: TAuth) => {
  const user = await User.findOne({ email: payload.email })

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found')
  }

  // chcek password matched
  if (!(await User.isPasswordMatched(payload?.password, user.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched!!')
  }
  // create token
  const jwtPlayload = {
    id: user._id,
    userEmail: user.email,
    name: user?.name,
    role: user?.role,
    image: user?.photoUrl,
  }
  const accessToken = jwt.sign(
    jwtPlayload,
    config.jwt_access_secret as string,
    {
      expiresIn: '10m',
    },
  )
  const refreshToken = jwt.sign(
    jwtPlayload,
    config.jwt_refresh_secret as string,
    {
      expiresIn: '30d',
    },
  )
  return {
    user,
    accessToken,
    refreshToken,
  }
}

const createRefreshToken = async (token: string) => {
  // check token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayloadWithUserEmail
  const { userEmail } = decoded
  const user = await User.findOne({ email: userEmail })
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found')
  }
  const jwtPlayload = {
    id: user._id,
    userEmail: user.email,
    name: user?.name,
    role: user?.role,
    image: user?.photoUrl,
  }
  const accessToken = jwt.sign(
    jwtPlayload,
    config.jwt_access_secret as string,
    {
      expiresIn: '10m',
    },
  )
  return {
    accessToken,
  }
}
export const getMeIntoDB = async (id: string) => {
  const user = await User.findById(id)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found')
  }
  return user
}
const becomeASeller = async (id: string) => {
  const user = await User.findById(id)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found')
  }

  if (user.role === 'user') {
    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { role: 'seller' },
      { new: true },
    )
    return updatedUser
  }

  throw new AppError(httpStatus.BAD_REQUEST, 'User is already a seller')
}

export const authService = {
  signInUser,
  createRefreshToken,
  getMeIntoDB,
  becomeASeller,
}
