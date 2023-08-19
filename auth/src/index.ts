import express from 'express'
import 'express-async-errors'
import mongoose from 'mongoose'
import { json } from 'express'
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
  secure: true
}))



app.use(signupRouter)
app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)




app.all('*', async () => {
  throw new NotFoundError()
})

app.use(errorHandler)


const start = async () => {

  if(!process.env.JWT_KEY){
    throw new Error('jwt secret key must be defined')
  }

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
    console.log('connected to mongodb')
  } catch (error) {
    console.error(error)
  }

  app.listen(4000, () => {
    console.log('listening  port 4000 : auth ')
  })

}

start();