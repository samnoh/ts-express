import { Request, Response, NextFunction } from 'express';

/**
 * GET /
 * Home page.
 */
export const index = (req: Request, res: Response, next: NextFunction) => {
    res.render('main', {
        title: 'Main'
    });
};

/**
 * GET /secret
 * Secret page.
 */
export const getSecret = (req: Request, res: Response, next: NextFunction) => {
    res.render('secret', {
        title: 'Secret'
    });
};
