import { Router } from 'express'
import { ProductRoute } from '../modules/product/product.route'
import { OrderRoutes } from '../modules/order/order.route'
import { UserRoute } from '../modules/user/user.route'
import { AuthRoute } from '../modules/auth/auth.route'

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
  {
    path: '/user',
    route: UserRoute,
  },
  {
    path: '/auth',
    route: AuthRoute,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
