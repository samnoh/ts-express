import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

import { User } from '../models/user';

interface RequestWithBody extends Request {
    body: { [key: string]: string | undefined };
}

/**
 * GET /login
 * Login page.
 */
export const getLogin = (req: RequestWithBody, res: Response, next: NextFunction) => {
    res.render('login', {
        title: 'Login'
    });
};

/**
 * POST /login
 * Sign in using userId and password.
 */
export const postLogin = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }

        if (!user) {
            return res.status(401).send(info.message);
        }

        return req.login(user, async loginError => {
            try {
                if (loginError) {
                    console.error(loginError);
                    return next(loginError);
                }

                const exUser = await User.findById(user._id).select({ password: 0 });
                return res.json(exUser);
            } catch (e) {
                next(e);
            }
        });
    })(req, res, next);
};
