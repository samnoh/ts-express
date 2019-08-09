import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';

import { User } from '../models/user';

/**
 * GET /account/login
 * Login page.
 */
export const getLogin = (req: Request, res: Response, next: NextFunction): void => {
    res.render('login', {
        title: 'Login'
    });
};

/**
 * POST /account/login
 * Sign in using userId and password.
 */
export const postLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    passport.authenticate(
        'local',
        (authError, user, info): void => {
            if (authError) {
                console.error(authError);
                return next(authError);
            }

            if (!user) {
                req.flash('errors', { msg: info.message });
                return res.redirect('/account/login');
            }

            req.login(
                user,
                (loginError): void => {
                    if (loginError) {
                        req.flash('errors', { msg: loginError });
                        return res.redirect('/account/login');
                    }
                    res.redirect(req.session.redirectTo || '/'); // redirect after successful login
                }
            );
        }
    )(req, res, next);
};

/**
 * GET /account/signup
 * Sign up page.
 */
export const getSignup = (req: Request, res: Response, next: NextFunction): void => {
    res.render('signup', {
        title: 'Register'
    });
};

/**
 * POST /account/signup
 * Sign up using name, email, userId and password.
 */
export const postSignup = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { name, email, userId, password } = req.body;

        const exUser = await User.findOne({ userId });
        if (exUser) {
            req.flash('errors', { msg: 'Already signed up' });
            return res.redirect('/account/signup');
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        await User.create({
            name,
            email,
            userId,
            password: hashedPassword
        });

        res.redirect('/account/login');
    } catch (e) {
        console.error(e);
        next(e);
    }
};

/**
 * GET /account/logout
 * Logout.
 */
export const getLogout = (req: Request, res: Response, next: NextFunction): void => {
    req.logout();
    req.session.destroy(() => null);
    res.redirect('/');
};
