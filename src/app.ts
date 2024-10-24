import express from 'express'
import cors from 'cors'
import router from './app/routes'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import cookieParser from 'cookie-parser'
const app = express()

//cors
app.use(
  cors({ origin: 'https://home-mart-frontend.vercel.app', credentials: true }),
)
// app.use(cors({ origin: ' http://localhost:5173', credentials: true }))

// Middleware to parse JSON request bodies
app.use(express.json())
app.use(cookieParser())

// Application routes
app.use('/api/v1', router)

// Default route
app.get('/', (req, res) => {
  res.send('Welcome Home Mart!')
})

// Global error handler middleware
app.use(globalErrorHandler)

export default app
