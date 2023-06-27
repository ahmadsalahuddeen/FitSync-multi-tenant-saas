import express from 'express'
const route = express.Router()

route.post('/api/users/signup', (req, res)=>{
res.send('hi there')
})

export {route as signupRouter}; 