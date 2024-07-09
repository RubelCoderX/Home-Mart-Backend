import express from 'express'
import cors from 'cors'
import router from './app/routes'
import globalErrorHandler from './app/middleware/globalErrorHandler'
const app = express()

// cors
app.use(express.json())
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))

//aplication route
app.use('/api/v1', router)

app.get('/', (req, res) => {
  res.send('Welcome Campers Shop!')
})

app.use(globalErrorHandler)

export default app
