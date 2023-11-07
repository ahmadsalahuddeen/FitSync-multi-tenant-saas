'use client';
import express, { Request, Response } from 'express';
const route = express.Router();
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { Account } from '../models/accountSchema';
import { BadRequestError } from '../errors/bad-request-error';
import jwt from 'jsonwebtoken';
import { validateRequest } from '../middlewares/request-vaidation';
import { User } from '../models/userSchema';
import { getDateNDaysFromNow } from '../helpers/date';
import { Gym } from '../models/gymSchema';

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
      confirmPassword,
    } = req.body;

    const emailExist = await User.findOne({ email });

    if (emailExist) {
      throw new BadRequestError('email is already in use');
    }
    if (password !== confirmPassword) {
      throw new BadRequestError('confirm password does not match');
    }


try {
  
  // create account, gym, user document and save to DB
  const account = Account.build({
    subscriptionType: 'freeTrial',
    currentPeriodEnds: getDateNDaysFromNow(30),
    maxCustomer: 50,
  });
  await account.save();


  const gym = Gym.build({
    accountId: account.id,
    name: businessName,
    phoneNumber,
  });
  await gym.save();

  const user = User.build({
    accountId: account.id,
    email,
    password,
    role: 'owner',
    firstName,
    lastName,
    gyms: [{gymId:gym.id, name: gym.name}],
  });
  await user.save();


  //add user to the gym
  gym.users = [user.id]
  await gym.save()
  
      // generate jwt token
      const userJwt = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: 'ADMIN',
        },
        process.env.JWT_KEY!
      );
      // store the token in session
      req.session = {
        jwt: userJwt,
      };
  
      res.status(201).send(user);
} catch (error) {
  console.log(error,'erro while creating user')
}





  }
);

export { route as signupRouter };
