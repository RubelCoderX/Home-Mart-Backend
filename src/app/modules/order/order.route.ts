import express from 'express'
import validRequest from '../../middleware/validRequest'
import { OrderValidation } from './order.validation'
import { OrderControllers } from './order.controller'

const router = express.Router()

router.post(
  '/create-order',
  validRequest(OrderValidation.orderValidationSchema),
  OrderControllers.getOrder,
)

export const OrderRoutes = router
