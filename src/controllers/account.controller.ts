import { Request, Response, NextFunction } from 'express';

/**
 * GET /login
 * Login page.
 */
export const getLogin = (req: Request, res: Response, next: NextFunction) => {
    res.render('login', {
        title: 'Login'
    });
};

/**
 * POST /login
 * Sign in using userId and password.
 */
export const postLogin = (req: Request, res: Response, next: NextFunction) => {
    const { userId, password }: { userId: string; password: string } = req.body;
    res.send(userId + password);
};
