import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

router.get('/login', (req: Request, res: Response, next: NextFunction) => {
    res.render('login', {
        title: 'Login'
    });
});

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
    const { userId, password } = req.body;
    res.send(userId + password);
});

export { router };
