import { Request, Response } from 'express';
import { Gym } from '../../models/gymSchema';
import { BadRequestError } from '../../errors/bad-request-error';
import { User } from '../../models/userSchema';

export const createGym = async (req: Request, res: Response) => {
  try {

    const { accountId, id } = req.currentUser;
    const { name, password, address } = req.body;

    if(!(name && password && address)) throw new BadRequestError('Provide valid credentials')



    const gym = Gym.build({
      accountId,
      name: 'asdf',
      phoneNumber: 'asdf',
      creatorId: id,
      address,
      staffs: id,
    });
    await gym.save()

    await User.findOneAndUpdate({id}, {$push: {gyms: gym.id}})

    res.status(201).send(gym)
  } catch (error) {


  }
};
