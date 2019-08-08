import { Router } from 'express';

import * as accountController from '../controllers/account.controller';

const router = Router();

router.get('/login', accountController.getLogin);

router.post('/login', accountController.postLogin);

export { router };
