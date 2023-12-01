import { Request, Response } from 'express';

import { Gym, gymAttrs } from '../../models/gymSchema';
import { DatabaseOperationError } from '../../errors/databse-operation-error';
import { BadRequestError } from '../../errors/bad-request-error';

import { User } from '../../models/userSchema';
const { v4: uuidv4 } = require('uuid');

//create gym for user's
export const createGym = async (req: Request, res: Response) => {
  try {
    const { accountId, id } = req.currentUser;
    const { name, phoneNumber, address } = req.body;

    if (!(name && phoneNumber && address))
      throw new BadRequestError('Provide valid credentials');

    // check's if the gym name is already taken
    const existingGym = await Gym.findOne({ name });

    const inviteCode = uuidv4();

    if (existingGym)
      throw new BadRequestError(
        'Gym Name is already taken, try different name'
      );

    const gym = Gym.build({
      accountId,
      name,
      phoneNumber,
      creatorId: id,
      address,
      staffs: [id],
      inviteCode,
    });
    await gym.save();

    await User.findOneAndUpdate({ id }, { $push: { gyms: gym?.id } });

    res.status(201).send(gym);
  } catch (error) {
    throw new BadRequestError('something went while creating gym ');
  }
};

// /gyms
export const getAllGyms = async (req: Request, res: Response) => {
  try {
    const { role, accountId, id } = req.currentUser;

    if (role === 'owner') {
      const gyms: gymAttrs[] = await Gym.find({ accountId }).sort({
        createdAt: -1,
      });

      res.status(200).send(gyms);
    } else if (role == 'member') {
      const gyms: gymAttrs[] = await Gym.find({ staffs: id }).sort({
        createdAt: -1,
      });
      res.status(200).send(gyms);
    }
  } catch (error) {
    throw new DatabaseOperationError('Error while getting all gyms');
  }
};

// /getGymWithInviteCode
export const getGymWithInviteCode = async (req: Request, res: Response) => {
  try {
    const { inviteCode } = req.query;

    const gymData = await Gym.findOne({ inviteCode });
if(!gymData) throw new BadRequestError('invalid invite code')
    res.status(200).send(gymData);
  } catch (error) {}
};
