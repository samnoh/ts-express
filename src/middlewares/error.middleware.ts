import { Request, Response, NextFunction } from 'express';

interface ErrorProps {
    status?: number;
    message?: string;
}

export const pageNotFound = (req: Request, res: Response, next: NextFunction) => {
    const err: ErrorProps = new Error('Not Found');
    err.status = 404;
    next(err);
};

export const errorHandler = (err: ErrorProps, req: Request, res: Response, next: NextFunction) => {
    res.locals.message = err.message;
    res.locals.error = err;
    res.status(err.status || 500);
    res.render('error', { title: `Error | ${err.status}` });
};
