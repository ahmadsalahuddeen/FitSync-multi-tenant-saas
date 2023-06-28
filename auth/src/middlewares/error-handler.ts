import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

import { Request, Response, NextFunction } from "express"

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {

 if(err instanceof RequestValidationError){
  console.log('handlilng this error as requeset validation error')
 }


 if( err instanceof DatabaseConnectionError){
  console.log('handling database error')
 }


  res.status(400).send({
    message:
      err.message
  })
};