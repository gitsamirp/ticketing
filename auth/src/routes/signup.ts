import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { RequestValidationError } from '../errors/request-validation-error';

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
(req: Request, res: Response) => {
    const errors = validationResult(req);
    if (errors.isEmpty() === false) {
        throw new RequestValidationError(errors.array())
    }

    const { email, password } = req.body;

    console.log("create user");

    throw new DatabaseConnectionError();

    res.send({});
});

export { router as signupRouter };