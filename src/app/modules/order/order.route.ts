import express from 'express'
import { OrderControllers } from './order.controller'
import { auth } from '../../middleware/auth'
import { USER_ROLES } from '../user/user.constant'
import validRequest from '../../middleware/validRequest'
import { OrderValidation } from './order.validation'

const router = express.Router()

router.post(
  '/create-order',
  auth(USER_ROLES.user),
  validRequest(OrderValidation.orderValidationSchema),
  OrderControllers.createOrder,
)
router.get('/get-order', OrderControllers.getAllOrders)
router.get('/my-order', auth(USER_ROLES.user), OrderControllers.getMyOrder)

export const OrderRoutes = router
