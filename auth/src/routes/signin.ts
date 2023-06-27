import express from 'express'
const route = express.Router()

route.post('/api/users/signin', (req, res)=>{
res.send('hi there')
})

export {route as signinRouter}; 