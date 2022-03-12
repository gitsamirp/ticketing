import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

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
        return res.status(400).send(errors.array());
    }

    const { email, password } = req.body;

    console.log("create user");

    res.send({});
});

export { router as signupRouter };