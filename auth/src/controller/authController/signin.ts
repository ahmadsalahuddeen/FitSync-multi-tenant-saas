import express from 'express';
import { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validateRequest } from '../../middlewares/request-vaidation';
import { BadRequestError } from '../../errors/bad-request-error';
import { Password } from '../../services/password';
import { Account } from '../../models/accountSchema';
import { User } from '../../models/userSchema';
const route = express.Router();

export const userSignIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    throw new BadRequestError('provide a valid login credentials');
  }

  const matchPassword = await Password.compare(password, existingUser.password);
  if (!matchPassword) {
    throw new BadRequestError('Incorrect password');
  }

  const payload = {
    id: existingUser.id,
    email: existingUser.email,
    role: existingUser.role,
  };
  const accessToken = jwt.sign(payload, process.env.JWT_KEY!);

  // store the token in session
  req.session = {
    jwt: accessToken,
  };

  res.status(200).send({
    existingUser,
    backendTokens: {
      accessToken,
      refreshToken: jwt.sign(payload, process.env.JWT_KEY!, {
        expiresIn: '7d',
      }),
    },
  });
};
