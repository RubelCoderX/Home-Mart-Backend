import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { User } from './user.model'

const createUserFromDB = catchAsync(async (req, res) => {
  const user = req.body
  const result = await User.create(user)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Created Successfully',
    data: result,
  })
})

export const UserControllers = {
  createUserFromDB,
}
