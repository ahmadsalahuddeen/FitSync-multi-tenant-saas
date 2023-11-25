import { Request, Response } from 'express';
import { NotAuthorizedError } from '../../errors/not-authorized-error';
import { Gym, gymAttrs } from '../../models/gymSchema';
import { DatabaseOperationError } from '../../errors/databse-operation-error';
import { BadRequestError } from '../../errors/bad-request-error';


// /gyms
export const getAllGyms = async (req: Request, res: Response) => {
  try {
    console.log('gggggeting hererererer')
    if(!req.currentUser) throw new BadRequestError('invalid req.currentuser')
    if (!req.currentUser) {
      throw new BadRequestError('no Req.currenUser / not authorized');
    }

    const { role, accountId, id } = req.currentUser;

    if (role == 'owner') {
      const gyms: gymAttrs[] = await Gym.find({ accountId }).sort({ createdAt: -1 });

      res.status(200).send({ gyms });
    } else if (role == 'member') {
      const gyms: gymAttrs[] = await Gym.find({ users: id }).sort({ createdAt: -1 });
      res.status(200).send({ gyms });
    }
  } catch (error) {
    throw new DatabaseOperationError('Error while getting all gyms');
  }
};
