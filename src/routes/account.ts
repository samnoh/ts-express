import { Router } from 'express';

import * as authMiddleware from '../middlewares/auth.middleware';
import * as accountController from '../controllers/account.controller';

const router = Router();

router.get('/login', authMiddleware.isNotLoggedIn, accountController.getLogin);

router.post('/login', authMiddleware.isNotLoggedIn, accountController.postLogin);

export { router };
