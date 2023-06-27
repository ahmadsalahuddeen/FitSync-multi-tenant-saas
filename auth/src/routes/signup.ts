import express, { Request, Response } from 'express'
const route = express.Router()
import { body } from 'express-validator';

route.post('/api/users/signup', [
  body('email')
    .isEmail()
    .withMessage('Provide a valid Email address'),

  body('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password must be between 4 and 20 characters')
], (req: Request, res: Response) => {
  res.send('hi there')
})

export { route as signupRouter }; 