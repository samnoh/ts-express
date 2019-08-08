import { Router } from 'express';

import * as authMiddleware from '../middlewares/auth.middleware';
import * as homeController from '../controllers/home.controller';

const router = Router();

router.get('/', homeController.index);

router.get('/secret', authMiddleware.isLoggedIn, homeController.getSecret);

export { router };
