import express, { json } from 'express'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import { createAuthController } from './routers/authRouter.js'
import { createTaskRouter } from './routers/taskRouter.js'
import cors from 'cors'
const app = express()
app.use(logger('dev'))
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true 
}))
app.use(json())
app.use(cookieParser())
app.use('/api', createAuthController())
app.use('/api/task', createTaskRouter())
export default app
