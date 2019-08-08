import fs from 'fs';
import dotenv from 'dotenv';

if (fs.existsSync('.env')) {
    dotenv.config({ path: '.env' });
} else {
    console.error('.env file not found');
    process.exit(1);
}

export const ENVIRONMENT = process.env.NODE_ENV;
export const prod = ENVIRONMENT === 'production';
export const SESSION_SECRET = process.env.SESSION_SECRET;
export const MONGODB_URI = prod ? process.env.MONGODB_URI : process.env.MONGODB_URI_LOCAL;

if (!SESSION_SECRET) {
    console.error('Set SESSION_SECRET env variable.');
    process.exit(1);
}

if (!MONGODB_URI) {
    if (prod) {
        console.error('Set MONGODB_URI env variable.');
    } else {
        console.error('Set MONGODB_URI_LOCAL env variable.');
    }
    process.exit(1);
}
