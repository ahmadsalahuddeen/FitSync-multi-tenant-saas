import express from 'express'
import 'express-async-errors'
import {json} from 'express'
import { currentUserRouter } from './routes/current-user'
import {signinRouter} from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'
import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/notFound-error'
const app = express()
app.use(json())

app.use(signupRouter)
app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)

app.all('*', async ()=>{
  throw new NotFoundError()
} )


app.use(errorHandler)

app.listen(4000, ()=>{
  console.log('listening  port 4000')
})