import {} from 'express'; // make it module

declare global {
    interface ErrorProps {
        status?: number;
        message?: string;
        stack?: string;
    }
}
