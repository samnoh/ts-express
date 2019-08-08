import path from 'path';
import express, { Express } from 'express';
import compression from 'compression';
import morgan from 'morgan';
import session from 'express-session';
import passport from 'passport';
import flash from 'express-flash';

import { SESSION_SECRET, prod } from './utils/secrets';
import { connect } from './models';
import { passportConfig } from './passport';

// Route handlers
import { router as authRouter } from './routes/account';
import { router as indexRouter } from './routes/home';
import * as errorMiddleware from './middlewares/error.middleware';

// Create Express server
const app: Express = express();

// Connect to db
connect();

// Passport configuration
passportConfig();

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
        resave: true,
        saveUninitialized: true,
        secret: SESSION_SECRET,
        cookie: {
            maxAge: 1209600000, // two weeks
            secure: prod,
            httpOnly: true
        },
        name: 'TS+EXPRESS'
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

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
