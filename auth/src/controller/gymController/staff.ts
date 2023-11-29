import { Request, Response } from 'express';
import { BadRequestError } from '../../errors/bad-request-error';

import { DatabaseOperationError } from '../../errors/databse-operation-error';
import { sendEmailInviteStaff } from '../../services/gym';

// send invite email to staff
export const inviteStaff = async (req: Request, res: Response) => {
  try {
    const { email, role } = req.body;
   
   
    if (!(email && role))
      throw new BadRequestError('provide valid credentials');



    const mailResponse = await sendEmailInviteStaff({
      email,
      subject: 'Password Reset Verification Code: Use Within 5 Minutes',
      duration: 1,
    });

    
    res.status(201).send({});
  } catch (error) {
    throw new DatabaseOperationError('Error while getting all gyms');
  }
};
