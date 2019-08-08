import { Request, Response, NextFunction } from 'express';

interface RequestWithPassport extends Request {
    isAuthenticated(): boolean;
}

export const isLoggedIn = (req: RequestWithPassport, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/account/login');
};

export const isNotLoggedIn = (req: RequestWithPassport, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
        return next();
    }

    res.redirect('/');
};

export const setUser = (req: RequestWithPassport, res: Response, next: NextFunction) => {
    res.locals.user = req.user;
    next();
};
