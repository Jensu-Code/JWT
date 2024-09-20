import express, { json } from 'express'
import logger from 'morgan'

import { createAuthController } from './routers/authRouter.js'
const app = express()
app.use(logger('dev'))
app.use(json())
app.use('/api', createAuthController())
export default app
