'use client';
import express, { Request, Response } from 'express';
import { Account } from '../../models/accountSchema';
import { BadRequestError } from '../../errors/bad-request-error';
import jwt from 'jsonwebtoken';
import { User } from '../../models/userSchema';
import { getDateNDaysFromNow } from '../../lib/date';
import { Gym } from '../../models/gymSchema';
import {
  checkEmailAndInviteCode,
  isInviteCodeValid,
  isValidInvitedEmail,
} from '../../services/auth';

export const staffInviteJoin = async (req: Request, res: Response) => {
  try {
    const { userId, inviteCode } = req.body;
    const user = await User.findOne({ _id: userId });
    if (!user) throw new BadRequestError('invalid userId ');

    const gym = await checkEmailAndInviteCode(user.email, inviteCode);

    user.gyms?.push(gym.id);

    await user.save();

    const newGymData = await Gym.findOneAndUpdate(
      { inviteCode },
      { $pull: { inviteEmailList:{email: user.email }}, $push: { staffs: user.id } },
      { new: true }
    );
    res.status(201).send(newGymData);
  } catch (error) {
    throw error;
  }
};

export const staffSignup = async (req: Request, res: Response) => {
  const {
    email,
    password,
    firstName,
    lastName,
    role,
    inviteCode,
    confirmPassword,
  } = req.body;

  if (!(role && inviteCode)) {
    throw new BadRequestError('request does not have invitecode or role ');
  }
  const emailExist = await User.findOne({ email });
  if (emailExist) {
    throw new BadRequestError('email is already in use');
  }
  if (password !== confirmPassword) {
    throw new BadRequestError('confirm password does not match');
  }
  const gymData = await isInviteCodeValid(inviteCode);

  await isValidInvitedEmail(email);

  try {
    const user = User.build({
      accountId: gymData?.accountId ,
      email,
      password,
      role,
      gyms: [gymData?.id],
      name: `${firstName} ${lastName}`,
    });
    await user.save();

    const newGymData = await Gym.findOneAndUpdate(
      { inviteCode },
      { $pull: { inviteEmailList: { email} }, $push: { staffs: user.id } },
      { new: true }
    );

    //add user to the gym

    const payload = {
      accountId: gymData?.accountId,
      id: user.id,
      email: user.email,
      role: user.role,
    };
    // generate jwt token
    const accessToken = jwt.sign(payload, process.env.JWT_KEY!);
    // store the token in session
    req.session = {
      jwt: accessToken,
    };

    res.status(201).send({
      user,
      backendTokens: {
        accessToken,
        refreshToken: jwt.sign(payload, process.env.JWT_KEY!, {
          expiresIn: '7d',
        }),
      },
    });
  } catch (error) {
    throw error;
  }
};
