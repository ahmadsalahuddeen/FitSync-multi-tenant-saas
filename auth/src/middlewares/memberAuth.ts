import { Response, Request, NextFunction } from 'express';
import { ExpressValidator } from 'express-validator';
import jwt from 'jsonwebtoken';
import { CustomError } from '../errors/custom-error';
import { BadRequestError } from '../errors/bad-request-error';
import { NotAuthorizedError } from '../errors/not-authorized-error';

type userPayload = {
  accountId: string,
  id: string;
  email: string;
  role: string;
  backendTokens: {
    accessToken: string;
    refreshToken?: string;
  };
};

declare global {
  namespace Express {
    interface Request {
      currentUser: userPayload;
    }
  }
}


export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) throw new NotAuthorizedError();

    const payload = jwt.verify(
      token,
      process.env.JWT_KEY!
    ) as userPayload;

      
    if (payload.role !== 'owner' && payload.role !== 'member' ) {
      throw new NotAuthorizedError(
        'sorry, only admins or staffs are allowed, your are not authorized!🪲'
      );
    }

    req.currentUser = payload;



  
  } catch (error) {
throw error
  }
  next();
};
