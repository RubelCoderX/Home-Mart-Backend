import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { OrderService } from './order.service'

const createOrder = catchAsync(async (req, res) => {
  const { id } = req.user

  const result = await OrderService.createOrderIntoDB(req.body, id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order Created Successfully!!',
    data: result,
  })
})

const getAllOrders = catchAsync(async (req, res) => {
  const orders = await OrderService.getAllOrders()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Orders Fetched Successfully!!',
    data: orders,
  })
})
const getMyOrder = catchAsync(async (req, res) => {
  const { id } = req.user
  const orders = await OrderService.getMyOrder(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Orders Fetched Successfully!!',
    data: orders,
  })
})

export const OrderControllers = {
  createOrder,
  getAllOrders,
  getMyOrder,
}
