import { Router } from 'express';

import * as homeController from '../controllers/home.controller';

const router = Router();

router.get('/', homeController.index);

router.get('/secret', homeController.getSecret);

export { router };
