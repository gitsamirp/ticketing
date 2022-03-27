import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '../errors/bad-request-error';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import { validateRequest } from '../middlewares/validate-request';


const router = express.Router();

router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage("Email not valid"),
    body('password')
        .trim()
        .isLength({ min: 5, max: 20 })
        .withMessage('Passowrd must be within 5 and 20 characters')
],
validateRequest,
async (req: Request, res: Response) => {
    console.log("here");

    //does email already exist
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new BadRequestError("Email already exists")
    }

    const user = User.register({ email, password });
    await user.save(); //persist to db

    const userJwt = jwt.sign({
        id: user.id,
        email: user.email,
    }, process.env.JWT_KEY!); // exclamation overides typescripts error because we have already added a check in index ts

    // store jwt on session
    req.session = {
        jwt: userJwt
    };

    res.status(201).send(user);

});

export { router as signupRouter };