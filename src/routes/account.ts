import { Router } from 'express';

import * as authMiddleware from '../middlewares/auth.middleware';
import * as accountController from '../controllers/account.controller';

const router = Router();

router.get('/login', authMiddleware.isNotLoggedIn, accountController.getLogin);
router.post('/login', authMiddleware.isNotLoggedIn, accountController.postLogin);

router.get('/signup', authMiddleware.isNotLoggedIn, accountController.getSignup);
router.post('/signup', authMiddleware.isNotLoggedIn, accountController.postSignup);

router.get('/logout', authMiddleware.isLoggedIn, accountController.getLogout);

export { router };
