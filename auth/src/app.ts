import express from 'express'
import 'express-async-errors'
import { json } from 'express'
const cors = require('cors');
var path = require('path');
require('dotenv').config()




import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/notFound-error'


import cookieSession from 'cookie-session'
const app = express()

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.static(path.resolve('./public')));



// app.set('trust proxy', true)
app.use(json())
app.use(cookieSession({
  signed: false,
  secure: process.env.NODE_ENV !== 'test'
}))

import {authRoute} from './routes/authRoute'
import { gymRoute } from './routes/gymRoute';

app.use('/api/auth', authRoute )
app.use('/api/gym', gymRoute)





app.all('*', async (req, res) => {


  throw new NotFoundError()
})

app.use(errorHandler)


export { app };
