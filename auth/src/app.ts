import express, { Request, Response } from 'express';
import cookieSession from 'cookie-session';
import 'express-async-errors'
const bodyParser = require('body-parser');

import { NotFoundError } from "./errors/not-found-error";
import { errorhandler } from "./middlewares/error-handler";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";

const app = express();
app.set('trust proxy', true);

app.use(bodyParser.json());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test', //do this to test for cookies as if secure is true then it wont set cookie on test
    })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.use(errorhandler);


app.get('*', async (req: Request, res: Response) => {
    throw new NotFoundError()
});

export { app };
