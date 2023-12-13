import { Request, Response } from 'express';
import { BadRequestError } from '../../errors/bad-request-error';

import { DatabaseOperationError } from '../../errors/databse-operation-error';
import { sendEmailInviteStaff } from '../../services/auth';
import { Gym, gymAttrs } from '../../models/gymSchema';
import { gymCreatorIdPopulated } from '../../types/types';
import { User } from '../../models/userSchema';
import { Password } from '../../lib/password';

// send invite email to staff
export const inviteStaff = async (req: Request, res: Response) => {
  try {
    const { email, role } = req.body;
    const gymId: any = req.headers['gymid'];

    const isInviteExist = await Gym.findOne({
      _id: gymId,
      'inviteEmailList.email': email,
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

    gymData.inviteEmailList?.push({ email, role });
    await gymData.save();

    res.status(201).send(gymData.inviteEmailList);
  } catch (error) {
    throw error;
  }
};

// send invite email to staff
export const resendInviteStaff = async (req: Request, res: Response) => {
  try {
    const { email, role } = req.body;
    const gymId: any = req.headers['gymid'];

    const gymData = await Gym.findOne({ _id: gymId });

    if (!gymData) throw new BadRequestError('cannot find your gym ');

    if (!(email && role)) throw new BadRequestError('provide email and role ');

    await sendEmailInviteStaff({
      email,
      role,
      gymData,
    });

    res.status(201).send({ success: true });
  } catch (error) {
    throw error;
  }
};

// send invite email to staff
export const cancelInviteStaff = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const gymId: any = req.headers['gymid'];

    // remove inviteemaillist object with provided email
    const gymData = await Gym.findOneAndUpdate(
      { _id: gymId, 'inviteEmailList.email': email },
      { $pull: { inviteEmailList: { email } } }
    );

    res.status(201).send({ success: true });
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
    const staffs = [...gymData.staffs, ...(gymData.inviteEmailList ?? [])];

    res.status(200).send(staffs);
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
    console.log('ggg');
    res.status(200).send({ success: true });
  } catch (error) {
    console.log(error);
    throw error;
    1;
  }
};
// gym/staff/change-status
export const removeStaff = async (req: Request, res: Response) => {
  try {
    const gymId: any = req.headers['gymid'];
    const { userId } = req.body;

    if (!(userId && gymId)) {
      throw new BadRequestError('Provide valid credentials');
    }

    const gym = await Gym.findById(gymId);
    if (gym?.creatorId == userId) {
      throw new BadRequestError('Not allowed to remove the creator account');
    }
    const userData = await User.findOneAndUpdate(
      { _Id: userId },
      { $pull: { gyms: gymId } },
      { new: true }
    );
    const gymData = await Gym.findOneAndUpdate(
      { _id: gymId },
      {
        $pull: { staffs: userId },
      }
    );

    res.status(200).send({ success: true });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//   api/auth/change-email
export const changeEmail = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(req.currentUser);
    const userId = req.currentUser.id;

    if (!(email && userId && password)) {
      throw new BadRequestError('Empty credentials are not allowed.');
    }
const isEmailExist = await User.findOne({email})
if(isEmailExist) {throw new BadRequestError(`Account created with ${email} address already exist `)}

    const userData = await User.findOne({ _id: userId });

    if (userData) {
      const isValidPassword = await Password.compare(
        password,
        userData?.password
      );

      if (!isValidPassword) {
        throw new BadRequestError('wrong password');
      }
      userData.email = email;
      await userData.save();
    } else {
      throw new BadRequestError('cannot find the user');
    }

    res.status(200).send(userData);
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};
//   api/auth/change-password
export const changePassword = async (req: Request, res: Response) => {
  try {
    const { password, newPassword, confirmNewPassword } = req.body;

    const userId = req.currentUser.id;
    // check if there is all data passed
    if (!(newPassword && userId && password && confirmNewPassword)) {
      throw new BadRequestError('Empty credentials are not allowed.');
    }
    const userData = await User.findOne({ _id: userId });

    if (userData) {
      // compare stored and current password
      const isValidPassword = await Password.compare(
        password,
        userData?.password
      );

      if (!isValidPassword) {
        throw new BadRequestError('wrong current password');
      }
      // validate password
      if (newPassword !== confirmNewPassword) {
        throw new BadRequestError('Confirm password does not matches!');
      }

      userData.password = newPassword;
      await userData.save();
    } else {
      throw new BadRequestError('cannot find the user');
    }

    res.status(200).send({ success: true });
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};
