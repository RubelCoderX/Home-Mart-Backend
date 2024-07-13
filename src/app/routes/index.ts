import { Router } from 'express'
import { ProductRoute } from '../modules/product/product.route'
import { OrderRoutes } from '../modules/order/order.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/product',
    route: ProductRoute,
  },
  {
    path: '/order',
    route: OrderRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
