import passport from 'passport';

import { User } from '../models/User';
import { local } from './local';

export const passportConfig = () => {
    passport.serializeUser<any, any>(
        (user, done): void => {
            done(undefined, user._id);
        }
    );

    passport.deserializeUser(
        async (id, done): Promise<void> => {
            try {
                const user = await User.findById(id);
                done(null, user); // -> req.user
            } catch (e) {
                console.error(e);
                done(e);
            }
        }
    );

    local();
};
