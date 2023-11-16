import auth from '../middlewares/auth';
import { getAllGyms } from '../controller/gymController/getGyms';

const gymRoute = require('express').Router();


gymRoute.get('/gyms',auth, getAllGyms);



export { gymRoute };
