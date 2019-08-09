import { Request, Response, NextFunction } from 'express';

export const pageNotFound = (req: Request, res: Response, next: NextFunction): void => {
    const err: ErrorProps = new Error('Not Found');
    err.status = 404;
    next(err);
};

export const errorHandler = (
    err: ErrorProps,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    res.locals.message = err.message;
    res.locals.error = err;
    res.status(err.status || 500);
    res.render('error', { title: `Error | ${err.status}` });
};
