
import mongoose from 'mongoose'

import { app } from './app'

const start = async () => {

  if (!process.env.JWT_KEY) {
    throw new Error('jwt secret key must be defined')
  }

  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/auth')
    console.log('connected to mongodb')
  } catch (error) {
    console.error(error)
  }

  app.listen(3000, () => {
    console.log('listening  port 3000 : auth ')
  })

}

start();