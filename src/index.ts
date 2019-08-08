import path from 'path';
import express, { Express, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
// import expressSession from 'express-session';
import dotenv from 'dotenv';
dotenv.config();

import * as authRouter from './routes/auth';
import * as indexRouter from './routes/index';

const app: Express = express();

const prod = process.env.NODE_ENV === 'production';

app.set('port', prod ? process.env.PORT : 5000);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.disable('x-powered-by');

if (prod) {
    app.use(morgan('combined'));
} else {
    app.use(morgan('tiny'));
}

app.use(express.static(path.join(__dirname, 'public'), { maxAge: 86400 }));
app.use(express.static(path.join(__dirname, '../node_modules/jquery/dist'), { maxAge: 86400 }));
app.use(express.static(path.join(__dirname, '../node_modules/bootstrap/dist'), { maxAge: 86400 }));
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter.router);
app.use('/auth', authRouter.router);

interface ErrorProps {
    status?: number;
    message?: string;
}

app.use((req: Request, res: Response, next: NextFunction) => {
    const err: ErrorProps = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err: ErrorProps, req: Request, res: Response, next: NextFunction) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error', { title: `Error | ${err.status}` });
});

app.listen(app.get('port'), () => {
    console.log(`Server has started port on ${app.get('port')}`);
});
