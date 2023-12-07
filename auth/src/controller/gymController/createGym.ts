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



    const inviteCode = uuidv4();

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

    const userData = await User.findByIdAndUpdate(id, { $push: { gyms: gym.id } }, {new: true});
    // console.log("userData:",userData , "gymId:" , gym.id)

    res.status(201).send(gym);
  } catch (error: any) {
    throw error

  }
};
