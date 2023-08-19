import express from 'express'
import { validateRequest } from '../middlewares/request-vaidation';
const route = express.Router()

route.post('/api/users/signout',
  (req, res) => {
    res.send('hi there')
  })

export { route as signoutRouter }; 