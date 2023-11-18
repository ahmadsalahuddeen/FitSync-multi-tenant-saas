import { body } from 'express-validator';
import { validateRequest } from '../middlewares/request-vaidation';
import { tenantSignup } from '../controller/authController/signup';
import { signout } from '../controller/authController/signout';
import { userSignIn } from '../controller/authController/signin';
import { getCurrentUser } from '../controller/authController/current-user';
import auth from '../middlewares/auth';
import { oauthSignIn } from '../controller/authController/oauthSignIn';

const authRoute = require('express').Router();

authRoute.post(
  '/users/signin',

  [
    body('email').isEmail().withMessage('please provide a valid email'),

    body('password')
      .trim()
      .notEmpty()
      .withMessage('you must provide a password'),
  ],
  validateRequest,
  userSignIn
);
authRoute.post(
  '/users/oauth-signin',

  [
    body('email').isEmail().withMessage('please provide a valid email'),

    
  ],
  validateRequest,
  oauthSignIn
);

authRoute.post(
  '/tenant/signup',
  [
    body('email').isEmail().withMessage('Provide a valid Email address'),

    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  tenantSignup
);

authRoute.post('/users/signout', signout);
authRoute.get('/users/currentuser',auth, getCurrentUser);



export { authRoute };
