'use client';
import express, { Request, Response } from 'express';
const route = express.Router();
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { Tenant} from '../models/tenant';
import { BadRequestError } from '../errors/bad-request-error';
import jwt from 'jsonwebtoken';
import { validateRequest } from '../middlewares/request-vaidation';

route.post(
  '/api/users/tenant/signup',
  [
    body('email').isEmail().withMessage('Provide a valid Email address'),

    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {


    const {
      email,
      password,
      businessName,
      firstName,
      lastName,
      phoneNumber,
      activeCustomers,
      refer,
      confirmPassowrd
    } = req.body;

    const emailExist = await Tenant.findOne({ email });

    if (emailExist) {
      throw new BadRequestError('email is already in use');
    }
    if(password !== confirmPassowrd){
      throw new BadRequestError('confirm password does not match')
    }


    const user = Tenant.build({
      email,
      password,
      businessName,
      firstName,
      lastName,
      phoneNumber,
      activeCustomers,
      refer,
    });
    await user.save();

    // generate jwt token
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    // store the token in session
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { route as signupRouter };
