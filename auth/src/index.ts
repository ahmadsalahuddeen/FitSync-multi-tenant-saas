
import mongoose from 'mongoose'

import { app } from './app'

const start = async () => {
console.log('')
  if (!process.env.JWT_KEY) {
    throw new Error('jwt secret key must be defined')
  }

  try {
     await mongoose.connect('mongodb://127.0.0.1:27017/auth')
    //await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
    console.log('connected to mongodb')
  } catch (error) {
    console.error(error)
  }

  app.listen(5000, () => {
    console.log('listening  port 5000 : auth ')
  })

}

start();