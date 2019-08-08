/// <reference types="express" />

type flashInput = { [key in 'msg']: string };

declare namespace Express {
    export interface Request {
        flash(event: string, message: flashInput | flashInput[]): void;
    }
}

interface Flash {
    flash(type: string, message: any): void;
}

declare module 'express-flash';
