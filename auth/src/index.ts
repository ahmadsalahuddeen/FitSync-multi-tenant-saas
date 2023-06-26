import express from 'express'
import {json} from 'express'

const app = express()
app.use(json())
app.get('/api/tenantId/currentTenant', (req, res)=>{
  res.send('hii ther')
})

app.listen(3000, ()=>{
  console.log('listening port 3000')
})