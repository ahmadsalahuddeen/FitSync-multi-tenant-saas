import express, { Request, Response } from 'express'
import { validateRequest } from '../../middlewares/request-vaidation';
const route = express.Router()

  const signout =  (req: Request, res: Response) => {
    req.session = null

    res.send({})
  }

  export { signout };
