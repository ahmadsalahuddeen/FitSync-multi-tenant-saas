import express from 'express'
import {json} from 'express'
import { currentUserRouter } from './routes/current-user'
import {signinRouter} from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'

const app = express()
app.use(json())
app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.listen(4000, ()=>{
  console.log('listening  port 4000')
})