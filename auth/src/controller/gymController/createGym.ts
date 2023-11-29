import { Request, Response } from 'express';
import { Gym } from '../../models/gymSchema';
import { BadRequestError } from '../../errors/bad-request-error';
import { User } from '../../models/userSchema';
const { v4: uuidv4 } = require('uuid');

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
      inviteCode
    });
    await gym.save();

    await User.findOneAndUpdate({ id }, { $push: { gyms: gym.id } });

    res.status(201).send(gym);
  } catch (error) {
    throw new BadRequestError('something went while creating gym ');
  }
};
