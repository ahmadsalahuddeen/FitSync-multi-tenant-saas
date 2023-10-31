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

var cors = require('cors');
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, PATCH, POST, DELETE, PUT, OPTIONS");
  next();
});



// app.set('trust proxy', true)
app.use(json())
app.use(cookieSession({
  signed: false,
  secure: process.env.NODE_ENV !== 'test'
}))



app.use(signupRouter)
app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)




app.all('*', async (req, res) => {
  var Url = req.protocol + '://' + req.get('host') + req.originalUrl;
  console.log(Url)
  console.log('hiii')
  throw new NotFoundError()
})

app.use(errorHandler)


export { app };
