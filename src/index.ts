import express, { Express, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import path from 'path';
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
app.use(express.json());

app.use('/auth', authRouter.router);
app.use('/', indexRouter.router);

app.listen(app.get('port'), () => {
    console.log(`Server has started port on ${app.get('port')}`);
});
