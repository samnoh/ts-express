// / <reference types="express" />

type flashInput = { [key in 'msg']: string };

declare namespace Express {
    export interface Request extends flashInterface {}
}

interface flashInterface {
    flash(event: string, message: flashInput | flashInput[]): void;
}

declare module 'express-flash';
