import express from 'express'
import 'express-async-errors'
import mongoose from 'mongoose'
import { json } from 'express'
require('dotenv').config()

import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'
import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/notFound-error'


import cookieSession from 'cookie-session'
const app = express()




app.set('trust proxy', true)
app.use(json())
app.use(cookieSession({
  signed: false,
  secure: process.env.NODE_ENV !== 'test'
}))



app.use(signupRouter)
app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)




app.all('*', async () => {
  throw new NotFoundError()
})

app.use(errorHandler)


export { app };
