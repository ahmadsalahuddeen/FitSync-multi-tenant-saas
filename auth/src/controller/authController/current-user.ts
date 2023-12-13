import jwt from 'jsonwebtoken';
import express, { Request, Response } from 'express';
const route = express.Router();

import { requireAuth } from '../../middlewares/require-auth';
import auth from '../../middlewares/adminAuth';
import { User } from '../../models/userSchema';
import { BadRequestError } from '../../errors/bad-request-error';

export const getCurrentUser = async(req: Request, res: Response) => {

  const user = await User.findOne({_id: req.currentUser?.id})
  if(!user)  {throw new BadRequestError('Invalid User')}
  res.send({ currentUser: req.currentUser });
};


