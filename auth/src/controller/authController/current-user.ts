import jwt from 'jsonwebtoken';
import express, { Request, Response } from 'express';
const route = express.Router();
import { currentUser } from '../../middlewares/authMiddleware';
import { requireAuth } from '../../middlewares/require-auth';

export const getCurrentUser = (req: Request, res: Response) => {};

route.get('/api/auth/users/currentuser', currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});


