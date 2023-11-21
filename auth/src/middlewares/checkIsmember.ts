import { NextFunction, Request, Response } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';
import { BadRequestError } from '../errors/bad-request-error';

export const isMember = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // TODO: delete this clg
    if (!req.currentUser) console.log('error dubug not req.currentuser ');

    const { role } = req.currentUser;
    if (role !== 'member') {
      throw new NotAuthorizedError(
        'sorry, only members or staff are allowed, your are not authorized!🪲'
      );
    }
  } catch (error) {
    throw new NotAuthorizedError(
      'sorry, only members or staff are allowed, your are not authorized!🪲'
    );
  }

  next();
};
