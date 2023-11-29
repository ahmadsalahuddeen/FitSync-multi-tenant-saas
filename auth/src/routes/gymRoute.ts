import auth from '../middlewares/adminAuth';
import { getAllGyms, getGymWithInviteCode } from '../controller/gymController/getGyms';

import adminAuth from '../middlewares/adminAuth';
import { createGym } from '../controller/gymController/createGym';
import checkIsmember from '../middlewares/memberAuth';
import memberAuth from '../middlewares/memberAuth';

const gymRoute = require('express').Router();


gymRoute.get('/gyms',memberAuth, getAllGyms);
gymRoute.post('/create',adminAuth , createGym);
// gymRoute.post('/invite-staff',adminAuth , inviteStaff);
gymRoute.get('/get-gym-invite-code', getGymWithInviteCode);



export { gymRoute };
