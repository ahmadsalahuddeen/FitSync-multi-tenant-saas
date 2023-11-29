'use client';
import express, { Request, Response } from 'express';
import { Account } from '../../models/accountSchema';
import { BadRequestError } from '../../errors/bad-request-error';
import jwt from 'jsonwebtoken';
import { User } from '../../models/userSchema';
import { getDateNDaysFromNow } from '../../lib/date';


export const tenantSignup = async (req: Request, res: Response) => {
  const {
    email,
    password,
    firstName,
    lastName,

   
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



    const user = User.build({
      accountId: account.id,
      email,
      password,
      role: 'owner',
   name: `${firstName} ${lastName}`,

    });
    await user.save();

    //add user to the gym
 

    const payload = {
      accountId: account.id,
      id: user.id,
      email: user.email,
      role: user.role,
    };
    // generate jwt token
    const accessToken = jwt.sign(payload, process.env.JWT_KEY!);
    // store the token in session
    req.session = {
      jwt: accessToken,
    };

    res.status(201).send({
      user,
      backendTokens: {
        accessToken,
        refreshToken: jwt.sign(payload, process.env.JWT_KEY!, {
          expiresIn: '7d',
        }),
      },
    });
  } catch (error) {
    throw new BadRequestError('something went wrong')

  }
};
