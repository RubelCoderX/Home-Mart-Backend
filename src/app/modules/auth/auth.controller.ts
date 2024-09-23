import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { authService } from './auth.service'
import config from '../../config'

const createSingInUserFromDB = catchAsync(async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.signInUser(
    req.body,
  )
  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  })
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User signed in successfully',
    data: {
      user,
      accessToken,
      refreshToken,
    },
  })
})
const createRefreshTokenFromDB = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies

  const result = await authService.createRefreshToken(refreshToken)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Token refreshed successfully',
    data: result,
  })
})
const getMeFromDB = catchAsync(async (req, res) => {
  const { id } = req.user

  const user = await authService.getMeIntoDB(id as string)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User fetched successfully',
    data: user,
  })
})
const becomeASellerFromDB = catchAsync(async (req, res) => {
  const { id } = req.user

  const user = await authService.becomeASeller(id as string)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User role updated successfully',
    data: user,
  })
})

export const authController = {
  createSingInUserFromDB,
  createRefreshTokenFromDB,
  getMeFromDB,
  becomeASellerFromDB,
}
