import { Request, Response, NextFunction } from 'express';

/**
 * GET /
 * Home page.
 */
export const index = (req: Request, res: Response, next: NextFunction) => {
    res.locals.user = req.user;
    res.render('main', {
        title: 'Main'
    });
};

/**
 * GET /secret
 * Secret page that only registered users can visit.
 */
export const getSecret = (req: Request, res: Response, next: NextFunction) => {
    res.render('secret', {
        title: 'Secret'
    });
};
