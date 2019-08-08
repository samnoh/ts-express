import fs from 'fs';
import dotenv from 'dotenv';

if (fs.existsSync('.env')) {
    dotenv.config({ path: '.env' });
} else {
    console.error('.env file not found');
    process.exit(1);
}

export const ENVIRONMENT: string = process.env.NODE_ENV as string;
export const prod: boolean = ENVIRONMENT === 'production';
export const SESSION_SECRET: string = process.env.SESSION_SECRET as string;
export const MONGODB_URI: string = prod
    ? (process.env.MONGODB_URI as string)
    : (process.env.MONGODB_URI_LOCAL as string);

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
