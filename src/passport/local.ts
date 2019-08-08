import passport from 'passport';
import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';

import { User } from '../models/User';

const LocalStrategy = passportLocal.Strategy;

export const local = () => {
    passport.use(
        new LocalStrategy(
            {
                usernameField: 'userId',
                passwordField: 'password'
            },
            async (email, password, done) => {
                try {
                    const user = await User.findOne({ userId: email });
                    if (!user) {
                        return done(null, false, { message: `Email ${email} not found.` });
                    }

                    const result = await bcrypt.compare(password, user.password);
                    if (result) {
                        return done(null, user);
                    }

                    return done(null, false, { message: 'Invalid email or password.' });
                } catch (e) {
                    console.error(e);
                    return done(e);
                }
            }
        )
    );
};
