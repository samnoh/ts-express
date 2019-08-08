import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

router.use('/', (req: Request, res: Response, next: NextFunction) => {
    res.render('main', {
        title: 'Main'
    });
});

export { router };
