import express from 'express'
import { Request, Response } from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'
import { validateRequest } from '../middlewares/request-vaidation'
import { BadRequestError } from '../errors/bad-request-error'
import { Password } from '../services/password'
import { User } from '../models/user'
const route = express.Router()

route.post('/api/users/signin',

  [
    body('email')
      .isEmail()
      .withMessage('please provide a valid email'),

    body('password')
      .trim()
      .notEmpty()
      .withMessage('you must provide a password')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const {email, password} = req.body

    const existingUser = await User.findOne({email})
    if(!existingUser){
      throw new BadRequestError('provide a valid login credentials')
    }

    const matchPassword = Password.compare(existingUser.password, password)
    if(!matchPassword){
      throw new BadRequestError('Incorrect password')
    }

    const userJwt = jwt.sign({ 
      id: existingUser.id,
      email: existingUser.email

    }, process.env.JWT_KEY!)

    // store the token in session
    req.session = {
      jwt: userJwt
    };


    res.status(200).send(existingUser)
  })

export { route as signinRouter }; 