import { NextFunction, Request, Response } from 'express'
import { TUserRole } from '../modules/user/user.interface'
import catchAsync from '../utils/catchAsync'
import AppError from '../error/AppError'
import httpStatus from 'http-status'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config'

export const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Token is required')
    }

    // Check if token is valid
    // check if the token is valid
    jwt.verify(
      token,
      config.jwt_access_secret as string,
      function (err, decoded) {
        if (err) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            'You are not Authorized!!two',
          )
        }
        const user = decoded as JwtPayload

        if (requiredRoles && !requiredRoles.includes(user.role)) {
          res.status(httpStatus.UNAUTHORIZED).json({
            success: false,
            statusCode: httpStatus.UNAUTHORIZED,
            message: 'You have no access to this route',
          })
          return
        }

        //decoded
        req.user = user
        next()
      },
    )
  })
}
