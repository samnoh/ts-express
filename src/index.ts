import express, { Express, Request, Response, NextFunction } from 'express';

const app: Express = express();

const prod = process.env.NODE_ENV === 'production';

app.set('port', prod ? process.env.PORT : 5000);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('hi');
});

app.listen(app.get('port'), () => {
    console.log(`Server has started port on ${app.get('port')}`);
});
