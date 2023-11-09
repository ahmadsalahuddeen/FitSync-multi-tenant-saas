'use client';
import express, { Request, Response } from 'express';
const route = express.Router();
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../../errors/request-validation-error';
import { Account } from '../../models/accountSchema';
import { BadRequestError } from '../../errors/bad-request-error';
import jwt from 'jsonwebtoken';
import { validateRequest } from '../../middlewares/request-vaidation';
import { User } from '../../models/userSchema';
import { getDateNDaysFromNow } from '../../services/date';
import { Gym } from '../../models/gymSchema';





export   const tenantSignup = async  (req: Request, res: Response) => {
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
      gyms: [{ gymId: gym.id, name: gym.name }],
    });
    await user.save();

    //add user to the gym
    gym.users = [user.id];
    await gym.save();

   const payload =  {
      id: user.id,
      email: user.email,
      role: user.role,
    }
    // generate jwt token
    const accessToken = jwt.sign(payload,
      process.env.JWT_KEY! 
    );
    // store the token in session
    req.session = {
      jwt: accessToken,
    };



    res.status(201).send({user, backendTokens: {
      accessToken,
      refreshToken: jwt.sign(payload ,process.env.JWT_KEY!, {expiresIn: '7d'} )
    }});
  } catch (error) {
    console.log(error, 'error while creating user');
  }
}

