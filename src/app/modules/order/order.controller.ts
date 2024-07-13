import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { OrderService } from './order.service'

const getOrder = catchAsync(async (req, res) => {
  const result = await OrderService.getOrderIntoDB(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order Created Successfully!!',
    data: result,
  })
})

export const OrderControllers = {
  getOrder,
}
