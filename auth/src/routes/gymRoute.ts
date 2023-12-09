import auth from '../middlewares/adminAuth';
import { getAllGyms, getGymWithInviteCode } from '../controller/gymController/getGyms';

import adminAuth from '../middlewares/adminAuth';
import { createGym } from '../controller/gymController/createGym';
import checkIsmember from '../middlewares/memberAuth';
import memberAuth from '../middlewares/memberAuth';
import { changeStaffStatus, getAllStaff, inviteStaff} from '../controller/gymController/staff';

const gymRoute = require('express').Router();


gymRoute.get('/gyms',memberAuth, getAllGyms);
gymRoute.get('/staff/:id',adminAuth, getAllStaff);


gymRoute.post('/create',adminAuth , createGym);
gymRoute.post('/staff/invite',adminAuth , inviteStaff);
gymRoute.post('/staff/change-status',memberAuth , changeStaffStatus);

gymRoute.get('/get-gym-invite-code', getGymWithInviteCode);



export { gymRoute };
