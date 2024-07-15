import express from 'express'
import cors from 'cors'
import router from './app/routes'
import globalErrorHandler from './app/middleware/globalErrorHandler'

const app = express()

//cors
app.use(cors({ origin: 'https://campers-shop-frontend-eight.vercel.app' }))

// Middleware to parse JSON request bodies
app.use(express.json())

// Application routes
app.use('/api/v1', router)

// Default route
app.get('/', (req, res) => {
  res.send('Welcome Campers Shop!')
})

// Global error handler middleware
app.use(globalErrorHandler)

export default app
