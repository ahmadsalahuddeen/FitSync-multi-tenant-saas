import { Request, Response } from 'express';
import { User } from '../../models/userSchema';
import { BadRequestError } from '../../errors/bad-request-error';
import { Gym } from '../../models/gymSchema';

export const changeRole = async (req: Request, res: Response) => {
  try {
    const { role, userId } = req.body;
    const gymId: any = req.headers['gymid'];

if(!(role && userId && gymId)){throw new BadRequestError('provide valid credentials')}
const isCreator = await Gym.findOne({creatorId: userId})
if(isCreator) {
  throw new BadRequestError(`Account Creator's role is not changeble`)
}    

const userData = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    );
    if (!userData) {
      throw new BadRequestError('something went wrong');
    }
    res.status(201).send(userData);
  } catch (error) {
    throw error;
  }
};
