import { Request, Response } from 'express';
import { BadRequestError } from '../../errors/bad-request-error';

import { DatabaseOperationError } from '../../errors/databse-operation-error';
import { sendEmailInviteStaff } from '../../services/auth';
import { Gym, gymAttrs } from '../../models/gymSchema';
import { gymCreatorIdPopulated } from '../../types/types';
import { User } from '../../models/userSchema';

// send invite email to staff
export const inviteStaff = async (req: Request, res: Response) => {
  try {
    // console.log('headers log in auth middlware', req.headers)

    const { email, role } = req.body;
    const gymId: any = req.headers['gymid'];

    const isInviteExist = await Gym.findOne({
      _id: gymId,
      inviteEmailList: email,
    });
    if (isInviteExist) {
      throw new BadRequestError('Invite Email is Already sent!');
    }

    const gymData = await Gym.findOne({ _id: gymId });

    if (!gymData) throw new BadRequestError('cannot find your gym ');

    if (!(email && role)) throw new BadRequestError('provide email and role ');

    await sendEmailInviteStaff({
      email,
      role,
      gymData,
    });

    gymData.inviteEmailList?.push(email);
    await gymData.save();

    res.status(201).send(gymData.inviteEmailList);
  } catch (error) {
    throw error;
  }
};

// /staffs
export const getAllStaff = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const gymData = await Gym.findById(id).populate('staffs');
    if (!gymData) throw new BadRequestError('Empty data');

    res.status(200).send(gymData?.staffs);
  } catch (error) {
    throw error;
  }
};
// gym/staff/change-status
export const changeStaffStatus = async (req: Request, res: Response) => {
  try {
    const { isActive, email } = req.body;

    const user = await User.findOneAndUpdate(
      { email },
      { isActive },
      { new: true }
    );


    res.status(200).send({ success: true });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
