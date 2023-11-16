import { Request, Response } from 'express';
import { NotAuthorizedError } from '../../errors/not-authorized-error';
import { Gym } from '../../models/gymSchema';
import { CustomError } from '../../errors/custom-error';

export const getAllGyms = async (req: Request, res: Response) => {
  try {
    if (!req.currentUser) {
      throw new NotAuthorizedError();
    }

    const { role, accountId, id } = req.currentUser;

    if (role == 'owner') {
      const gyms = await Gym.find({ accountId }).sort({ createdAt: -1 });

      res.status(200).send({ gyms });
    } else if (role == 'member') {
      const gyms = await Gym.find({ users: id }).sort({ createdAt: -1 });
      res.status(200).send({ gyms });
    }
  } catch (error) {
    console.log(error);
    
  }
};
