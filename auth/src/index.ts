const express = require('express');
import 'express-async-errors'
const bodyParser = require('body-parser');
import mongoose from 'mongoose';

import { NotFoundError } from "./errors/not-found-error";
import { errorhandler } from "./middlewares/error-handler";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";


const app = express();
app.use(bodyParser.json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.use(errorhandler);

app.get('*', async (req, res) => {
    throw new NotFoundError()
});

const startup = async () => {
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
        console.log("connected to mongo");
        
    } catch (err) {
        console.log(err);
    }
}

app.listen(3000, () => {
    console.log("listening on portsss 3000");
});

startup();
