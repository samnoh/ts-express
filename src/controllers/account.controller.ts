import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';

import { User } from '@models/user';
import { controller, get, post, use, bodyValidator } from '@deco';
import { isLoggedIn, isNotLoggedIn } from '@middlewares';

@controller('/account')
class AccountCtlr {
    /**
     * Login page.
     */
    @get('/login')
    @use(isNotLoggedIn)
    getLogin(req: Request, res: Response, next: NextFunction): void {
        res.render('login', {
            title: 'Login'
        });
    }

    /**
     * Sign in using userId and password.
     */
    @post('/login')
    @use(isNotLoggedIn)
    async postLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
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
    }

    /**
     * Sign up page.
     */
    @get('/signup')
    @use(isNotLoggedIn)
    getSignup(req: Request, res: Response, next: NextFunction): void {
        res.render('signup', {
            title: 'Register'
        });
    }

    /**
     * Sign up using name, email, userId and password.
     */
    @post('/signup')
    @use(isNotLoggedIn)
    @bodyValidator('name', 'email', 'userId', 'password')
    async postSignup(req: Request, res: Response, next: NextFunction): Promise<void> {
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
    }

    /**
     * Logout.
     */
    @get('/logout')
    @use(isLoggedIn)
    getLogout(req: Request, res: Response, next: NextFunction): void {
        req.logout();
        req.session.destroy(null);
        res.redirect('/');
    }
}
