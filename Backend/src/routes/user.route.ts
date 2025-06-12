
import { Router } from 'express';
import { jwtCheck } from '../middlewares/auth.middleware.js';
import { getUrls, signupUser } from '../controllers/user.controller.js';

const router = Router();

router.route('/signup').post(jwtCheck, signupUser)
router.route('/getShorturls').post(jwtCheck, getUrls);

export default router;
