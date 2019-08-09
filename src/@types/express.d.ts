import express = require('express');

declare module 'express' {
    interface Request {
        body: { [key: string]: string | undefined };
    }
}
