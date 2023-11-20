import { Request, Response } from 'express';
import {
  resetUserPassword,
  sendOtp,
  verifyOtpHelper,
} from '../../services/otp';
import { BadRequestError } from '../../errors/bad-request-error';

//   api/auth/forgot-password
export const requestOtp = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const createdOtp = await sendOtp({
      email,
      subject: 'Password Reset Verification Code: Use Within 5 Minutes',
      duration: 1,
    });

    res.status(200).send(createdOtp);
  } catch (error: any) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

//   api/auth/verify-otp
export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    const validOtp = await verifyOtpHelper({ email, otp });

    res.status(200).send({ validOtp });
  } catch (error: any) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

//   api/auth/reset-password
export const resetPassword = async (req: Request, res: Response) => {
  try {
    console.log('aaaaaaaaaaa', req.body)
    const { email, otp, password } = req.body;

    if (!(email && otp && password)) {
      throw new BadRequestError('Empty credentials are not allowed.');
    }

    await resetUserPassword({ email, otp, password });

    res.status(200).send({ email, success: true });
  } catch (error: any) {
    console.log(error);
    res.status(400).send(error.message);
  }
};
