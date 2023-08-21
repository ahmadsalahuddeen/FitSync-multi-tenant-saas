import jwt from 'jsonwebtoken'
import express from 'express'
const route = express.Router()

route.get('/api/users/currentUser', (req, res) => {
  if (!req.session?.jwt) {
    return res.send({ currentUser: null })
  }
try {
  
  const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!)
  if(!payload ){
    return res.send({currentUser: null})
  }
  res.send({currentUser: payload})
} catch (error) {
return res.send({currentUser: null})
}

})

export { route as currentUserRouter }; 