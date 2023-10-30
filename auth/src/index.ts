
import mongoose from 'mongoose'

import { app } from './app'

const start = async () => {
app.get('hi', (req, res)=>{
  console.log('hi')
  res.send('hi mom')
})
  if (!process.env.JWT_KEY) {
    throw new Error('jwt secret key must be defined')
  }

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
    console.log('connected to mongodb')
  } catch (error) {
    console.error(error)
  }

  app.listen(3000, () => {
    console.log('listening  port 3000 : auth ')
  })

}

start();