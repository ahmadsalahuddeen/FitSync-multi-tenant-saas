import jwt from 'jsonwebtoken'
import express from 'express'
const route = express.Router()
import { currentUser } from '../../middlewares/currentUser';
import { requireAuth } from '../../middlewares/require-auth';


route.get('/api/auth/users/currentuser', currentUser,  (req, res) => {
  res.send({currentUser: req.currentUser || null})

})

export { route as currentUserRouter };  