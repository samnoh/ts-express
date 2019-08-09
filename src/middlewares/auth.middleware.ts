import { Request, Response, NextFunction } from 'express';

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/account/login');
};

export const isNotLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
        return next();
    }

    res.redirect('/');
};

export const setUser = (req: Request, res: Response, next: NextFunction) => {
    res.locals.user = req.user;
    next();
};
