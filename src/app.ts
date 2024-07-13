import express from 'express'
import cors from 'cors'
import router from './app/routes'
import globalErrorHandler from './app/middleware/globalErrorHandler'

const app = express()

// Enable CORS for requests from http://localhost:5173
app.use(cors({ origin: 'http://localhost:5173' }))

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
