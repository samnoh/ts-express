import { Request, Response, NextFunction } from 'express';

import { controller, get, use } from './decorators';
import { isLoggedIn } from '../middlewares';

@controller('')
class HomeCtrl {
    /**
     * Home page.
     */
    @get('/')
    index(req: Request, res: Response, next: NextFunction) {
        res.locals.user = req.user;
        res.render('main', {
            title: 'Main'
        });
    }

    /**
     * Secret page that only registered users can visit.
     */
    @get('/secret')
    @use(isLoggedIn)
    getSecret(req: Request, res: Response, next: NextFunction) {
        res.render('secret', {
            title: 'Secret'
        });
    }
}
