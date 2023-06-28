import express, { Request, Response } from 'express'
const route = express.Router()
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

route.post('/api/users/signup',

  [
    body('email')
      .isEmail()
      .withMessage('Provide a valid Email address'),

    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters')
  ],

  (req: Request, res: Response) => {
    const errors = validationResult(req)
    
    if (!errors.isEmpty()) {
     throw new RequestValidationError(errors.array())
    }
    console.log('getting here')

    const { email, password } = req.body
    console.log(`Creating a User`)
    throw new DatabaseConnectionError()
    res.send({})

  })

export { route as signupRouter }; 