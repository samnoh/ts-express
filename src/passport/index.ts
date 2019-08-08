import passport from 'passport';

import { User } from '../models/User';
import { local } from './local';

export const passportConfig = () => {
    passport.serializeUser<any, any>((user, done) => {
        done(undefined, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user); // -> req.user
        } catch (e) {
            console.error(e);
            done(e);
        }
    });

    local();
};
