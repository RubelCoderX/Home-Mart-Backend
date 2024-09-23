import express from 'express'
import validRequest from '../../middleware/validRequest'

import { authController } from './auth.controller'
import { AuthValidation } from '../user/user.validation'
import { auth } from '../../middleware/auth'
import { USER_ROLES } from '../user/user.constant'

const router = express.Router()

router.post(
  '/login',
  validRequest(AuthValidation.LoginAuthValidation),
  authController.createSingInUserFromDB,
)

router.post(
  '/refresh-token',
  validRequest(AuthValidation.refreshTokenValidationSchema),
  authController.createRefreshTokenFromDB,
)
router.get(
  '/get-me',
  auth(USER_ROLES.seller, USER_ROLES.user),

  authController.getMeFromDB,
)
router.put(
  '/become-seller',
  auth(USER_ROLES.user),
  authController.becomeASellerFromDB,
)

export const AuthRoute = router
