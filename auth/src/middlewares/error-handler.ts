import { Request, Response, NextFunction } from "express"
import { CustomError } from "../errors/custom-errors";

export const errorhandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
        res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }

    res.status(400).send({
        errors: [{ message: 'Something went wrong'}]
    });
};
//make sure all errors return in the same format
