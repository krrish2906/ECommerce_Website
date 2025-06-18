import express from 'express';
const router = express.Router();

// User Middlewares, Controllers & Routes:-
import { validateUserInfo, validateUserLoginInfo } from '../../middlewares/UserMiddleware.js'
import { signup, login, logout } from '../../controllers/UserController.js';

router.post('/user/signup', validateUserInfo, signup);
router.post('/user/login', validateUserLoginInfo, login);
router.post('/user/logout', logout);



export default router;