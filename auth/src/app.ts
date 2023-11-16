import express from 'express'
import 'express-async-errors'
import { json } from 'express'
const cors = require('cors');

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

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
//   res.setHeader("Access-Control-Allow-Methods", "GET, PATCH, POST, DELETE, PUT, OPTIONS");
//   next();
// });



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
