import { Gym } from "../models/gymSchema"

export const joinGym = async (inviteCode: string, email: string)=>{

const gym = await Gym.findOne({})


}