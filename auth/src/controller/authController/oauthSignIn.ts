import { Request, Response } from "express";
import { BadRequestError } from "../../errors/bad-request-error";
import { User } from "../../models/userSchema";
import { Account } from "../../models/accountSchema";
import { getDateNDaysFromNow } from "../../services/date";

export const oauthSignIn = async (req: Request, res: Response)=>{
  try {

    let {email, firstName, lastName, image}  = req.body
    const user= await User.find({email})
    if(!user){
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
        firstName,
        lastName,

      });
      await user.save();
    
    
    
    }

  } catch (error) {
   throw  new BadRequestError('Error handling provider signin')
  }



} 