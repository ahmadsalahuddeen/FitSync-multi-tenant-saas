import jwt from 'jsonwebtoken';
import express, { Request, Response } from 'express';
const route = express.Router();

import { requireAuth } from '../../middlewares/require-auth';
import auth from '../../middlewares/auth';
import { User } from '../../models/userSchema';

export const getCurrentUser = async(req: Request, res: Response) => {

  const user = await User.findOne({id: req.currentUser?.id})
  res.send({ currentUser: req.currentUser || null });
};


