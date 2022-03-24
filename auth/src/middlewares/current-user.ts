import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

interface UserPayload  {
    id: string;
    email: string;
}

// this allows us to go into request and add a property
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload
        }
    }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session?.jwt) {
        return next();
    }

    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
        req.currentUser = payload; // add to request so easily accessed from all request handlers
    } catch (err) {}

    next();
};
