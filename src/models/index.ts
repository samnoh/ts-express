import mongoose from 'mongoose';
import { prod, MONGODB_URI } from '../utils/secrets';

export const connect = () => {
    const connect = () => {
        if (!prod) {
            mongoose.set('debug', true);
        }
        mongoose.connect(
            MONGODB_URI,
            {
                dbName: 'ts-express-demo',
                useNewUrlParser: true,
                useFindAndModify: false
            },
            err => {
                if (err) {
                    console.log('MongoDB Connection Error', err);
                } else {
                    console.log('MongoDB Connected!');
                }
            }
        );
    };
    connect();

    mongoose.connection.on('error', error => {
        console.error('MongoDB connection error', error);
    });
    mongoose.connection.on('disconnected', () => {
        console.error('MongoDB disconnected! Trying to connect...');
        connect();
    });
};
