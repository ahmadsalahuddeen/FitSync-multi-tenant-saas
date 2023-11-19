import { Request, Response } from 'express';
import { sendOtp, verifyOtpHelper } from '../../services/otp';

export const requestOtp = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const createdOtp = await sendOtp({ email, subject: "Password Reset Verification Code: Use Within 5 Minutes", duration : 1 });

    res.status(200).send(createdOtp);
  } catch (error: any) {
    console.log(error);
    res.status(400).send(error.message);
  }
};


export const   verifyOtp = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

const validOtp = await verifyOtpHelper({email, otp})

res.status(200).send({valid: validOtp})

  } catch (error: any) {
    console.log(error);
    res.status(400).send(error.message);
  }
};
