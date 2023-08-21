import jwt from 'jsonwebtoken'
import express from 'express'
const route = express.Router()
import { currentUser } from '../middlewares/currentUser';


route.get('/api/users/currentUser', currentUser, (req, res) => {
  res.send({currentUser: req.currentUser || null})

})

export { route as currentUserRouter }; 