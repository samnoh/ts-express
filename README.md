# TypeScript + Express.js

## Dependencies

-   express.js
-   express-status-monitor

## TIL

### Mapped Types

```typescript
type Keys = 'message' | 'isAdmin';
type Flags = { [K in Keys]: boolean };
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
