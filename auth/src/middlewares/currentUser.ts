import { Response, Request, NextFunction } from "express";
import { ExpressValidator } from "express-validator";
import jwt from 'jsonwebtoken'

interface userPayload {
  id: string,
  email: string
  role?: string
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: userPayload
    }
  }

}


export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {


  if (!req.session?.jwt) {
    console.log('nojwtsecret')
    return next()
  }

  try {
    const payload = jwt.verify(req.session?.jwt, process.env.JWT_KEY!) as userPayload
    req.currentUser = payload
  } catch (error) { }
  next();
}