
import mongoose from 'mongoose'

import { app } from './app'

const start = async () => {

  if (!process.env.JWT_KEY) {
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