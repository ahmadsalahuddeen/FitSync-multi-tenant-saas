import express from 'express'
const route = express.Router()

route.get('/api/users/currentUser', (req, res)=>{
res.send('hi there')
})

export {route as currentUserRouter}; 