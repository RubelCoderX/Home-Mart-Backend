import express from 'express'
import validRequest from '../../middleware/validRequest'
import { AuthValidation } from './user.validation'
import { UserControllers } from './user.controller'
const router = express.Router()

router.post(
  '/register',
  validRequest(AuthValidation.CreateAuthValidation),
  UserControllers.createUserFromDB,
)

export const UserRoute = router
