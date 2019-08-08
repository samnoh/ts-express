# TypeScript + Express.js

## `Dependencies`

-   bcrypt
-   bootstrap
-   compression
-   dotenv
-   express
-   express-flash
-   express-session
-   passport
-   passport-local
-   mongoose
-   helmet
-   hpp
-   pug

## TIL

### Mapped Types

```typescript
type Roles = 'isUser' | 'isAdmin';
const userHandler = (role: { [K in Roles]: boolean }): void => { ... };

userHandler({'isUser': false});
userHandler({'newKey': true}); // error!
```

### Express

-   Type Definition

```bash
npm install --save-dev @types/express
```

-   Usage

```TypeScript
import express, { Express, Request, Response, NextFunction } from 'express';
const app: Express = express();
app.get('/', (req: Request, res: Response, next: NextFunction) => { ... });
```

### Unix Copy

```bash
cp -r [folder] [dest folder]
```
