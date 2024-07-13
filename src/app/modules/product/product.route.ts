import express from 'express'
import validRequest from '../../middleware/validRequest'

import { ProductController } from './product.controllert'
import { productValidationSchema } from './product.validation'

const router = express.Router()

router.post(
  '/create-product',
  validRequest(productValidationSchema.createProductValidationSchema),
  ProductController.createProduct,
)
router.get('/', ProductController.getAllProduct)
router.get('/:id', ProductController.getSingleProduct)
router.put(
  '/:id',
  validRequest(productValidationSchema.updateValidationSchema),
  ProductController.updateProduct,
)
router.delete('/:id', ProductController.deleteProduct)

export const ProductRoute = router
