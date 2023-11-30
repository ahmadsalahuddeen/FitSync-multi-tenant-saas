import { Request, Response } from 'express';
import { BadRequestError } from '../../errors/bad-request-error';

import { DatabaseOperationError } from '../../errors/databse-operation-error';
import { sendEmailInviteStaff } from '../../services/gym';
import { Gym } from '../../models/gymSchema';

// send invite email to staff
export const inviteStaff = async (req: Request, res: Response) => {
  try {
    // console.log('headers log in auth middlware', req.headers)

    const { email, role } = req.body;
    const gymId: any = req.headers['gymid'];
console.log('gymdi: ', gymId)
    const gymData = await Gym.findOne({ _id: gymId });

    if (!gymData) throw new BadRequestError('cannot find your gym ');

    if (!(email && role)) throw new BadRequestError('provide email and role ');

    await sendEmailInviteStaff({
      email,
      gymData,
    });

    gymData.inviteEmailList?.push(email);
    await gymData.save();

    
    res.status(201).send(gymData.inviteEmailList);
  } catch (error) {
console.log(error)
res.status(500).send(error)
  }
};
