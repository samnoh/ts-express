import path from 'path';
import express, { Express, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import session from 'express-session';
import compression from 'compression';
import { SESSION_SECRET, prod } from './utils/secrets';

// Route handlers
import { router as authRouter } from './routes/account';
import { router as indexRouter } from './routes/home';
import * as errorMiddleware from './middlewares/error.middleware';

const app: Express = express();

// Express configuration
app.set('port', prod ? process.env.PORT : 5000);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use(compression());
app.use(morgan(prod ? 'combined' : 'tiny'));
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 86400 }));
app.use(express.static(path.join(__dirname, '..', '/node_modules/jquery/dist'), { maxAge: 86400 }));
app.use(
    express.static(path.join(__dirname, '..', '/node_modules/bootstrap/dist'), { maxAge: 86400 })
);
app.use(express.urlencoded({ extended: false })); // body-parser
app.use(express.json()); // body-parser
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: SESSION_SECRET as string,
        cookie: {
            maxAge: 1209600000, // two weeks
            secure: prod,
            httpOnly: true
        },
        name: 'TS+EXPRESS'
    })
);

app.disable('x-powered-by');

// App routes
app.use('/', indexRouter);
app.use('/account', authRouter);
app.use(errorMiddleware.pageNotFound);

// Error handlers
app.use(errorMiddleware.errorHandler);

app.listen(app.get('port'), () => {
    console.log(`Server has started port on ${app.get('port')} in ${app.get('env')} mode`);
});
