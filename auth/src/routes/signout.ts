import express from 'express'
import { validateRequest } from '../middlewares/request-vaidation';
const route = express.Router()

route.post('/api/users/signout',
  (req, res) => {
    req.session = null

    res.send({})
  })

export { route as signoutRouter }; 