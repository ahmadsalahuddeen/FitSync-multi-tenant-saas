import { body } from 'express-validator';
import { validateRequest } from '../middlewares/request-vaidation';
import { tenantSignup } from '../controller/authController/signup';
import { signout } from '../controller/authController/signout';
import { userSignIn } from '../controller/authController/signin';
import { getCurrentUser } from '../controller/authController/current-user';
import auth from '../middlewares/auth';

const gymRoute = require('express').Router();


gymRoute.get('/gyms',auth, getCurrentUser);



export { gymRoute };
