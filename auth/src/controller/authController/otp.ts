import { Request, Response } from 'express';
import { sendOtp } from '../../services/otp';

export const requestOtp = async (req: Request, res: Response) => {
  try {
    const { email, subject, message, duration } = req.body;

    const createdOtp = await sendOtp({ email, subject, message, duration });

    res.status(200).send(createdOtp);
  } catch (error: any) {
    console.log(error);
    res.status(400).send(error.message);
  }
};
