import auth from '../middlewares/adminAuth';
import { getAllGyms } from '../controller/gymController/getGyms';
import { isAdmin } from '../middlewares/checkIsAdmin';
import adminAuth from '../middlewares/adminAuth';

const gymRoute = require('express').Router();


gymRoute.get('/gyms',auth, getAllGyms);
gymRoute.post('/create',adminAuth , createGym);



export { gymRoute };
