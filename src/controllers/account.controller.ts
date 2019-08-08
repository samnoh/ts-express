import { Request, Response, NextFunction } from 'express';

interface RequestWithBody extends Request {
    body: { [key: string]: string | undefined };
}

/**
 * GET /login
 * Login page.
 */
export const getLogin = (req: RequestWithBody, res: Response, next: NextFunction) => {
    req.flash('errors', { msg: 'hello' });

    res.render('login', {
        title: 'Login'
    });
};

/**
 * POST /login
 * Sign in using userId and password.
 */
export const postLogin = (req: RequestWithBody, res: Response, next: NextFunction) => {
    const { userId, password } = req.body;
    if (userId && password) res.send(userId + password);
};
