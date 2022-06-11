import express, { Request, Response } from 'express';
import cookieSession from 'cookie-session';
import 'express-async-errors'
const bodyParser = require('body-parser');
import { errorhandler, NotFoundError, currentUser } from '@samirlfc1/common';
import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { indexTicketRouter } from './routes';
import { updateTicketRouter } from './routes/update';


const app = express();
app.set('trust proxy', true);

app.use(bodyParser.json());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test', //do this to test for cookies as if secure is true then it wont set cookie on test
    })
);
app.use(currentUser); // must be after cookie session
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.use(errorhandler);


app.get('*', async (req: Request, res: Response) => {
    throw new NotFoundError()
});

export { app };
