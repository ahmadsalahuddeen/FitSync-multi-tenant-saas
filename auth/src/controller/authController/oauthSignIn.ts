import { Request, Response } from 'express';
import { BadRequestError } from '../../errors/bad-request-error';
import { User } from '../../models/userSchema';
import { Account } from '../../models/accountSchema';
import { getDateNDaysFromNow } from '../../services/date';
import jwt from 'jsonwebtoken'

export const oauthSignIn = async (req: Request, res: Response) => {
  try {
    let { email, name, image } = req.body;
    const userData = await User.findOne({ email });
    if (!userData) {
      const account = Account.build({
        subscriptionType: 'freeTrial',
        currentPeriodEnds: getDateNDaysFromNow(30),
        maxCustomer: 50,
      });
      await account.save();

      const user = User.build({
        accountId: account.id,
        email,
        role: 'owner',
        name,
        image,
        password: ''
        
      });
      await user.save();

      const payload = {
        accountId: account.id,
        id: user.id,
        email: user.email,
        role: user.role,
      };

    const accessToken = jwt.sign(payload, process.env.JWT_KEY!);
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

    }else {
      

      
      
      const payload = {
        accountId: userData.accountId,
        id: userData.id,
        email: userData.email,
        role: userData.role,
      };
      const accessToken = jwt.sign(payload, process.env.JWT_KEY!);

      // store the token in session
      req.session = {
        jwt: accessToken,
      };
    
      res.status(200).send({
        user: userData,
        backendTokens: {
          accessToken,
          refreshToken: jwt.sign(payload, process.env.JWT_KEY!, {
            expiresIn: '7d',
          }),
        },
      });
    }


  } catch (error) {
    console.log(error)
    throw new BadRequestError('Error handling provider signin');
  }
};
