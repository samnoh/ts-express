import { Request, Response, NextFunction } from 'express';
import { prod } from '../utils/secrets';

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
    err.stack = prod ? '' : err.stack;
    res.locals.error = err;
    res.status(err.status || 500); // 500 Internal Server Error
    res.render('error', { title: `Error | ${err.status}` });
};
