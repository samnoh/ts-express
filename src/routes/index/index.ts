import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.render('main', {
        title: 'Main'
    });
});

router.get('/secret', (req: Request, res: Response, next: NextFunction) => {
    console.log(1);
    res.render('secret', {
        title: 'Secret'
    });
});

export { router };
