import { ErrorRequestHandler } from 'express'
import { TErrorSources } from '../interface/error'
import { ZodError } from 'zod'
import handleZodError from '../error/handleZodeError'
import AppError from '../error/AppError'

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500
  let message = 'Something went wrong!!'

  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ]
  if (err instanceof ZodError) {
    const simplefiedError = handleZodError(err)
    statusCode = simplefiedError?.statusCode
    message = simplefiedError?.message
    errorSources = simplefiedError?.errorSources
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode
    message = err?.message
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ]
  } else if (err instanceof Error) {
    message = err.message
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ]
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
  })
}

export default globalErrorHandler
