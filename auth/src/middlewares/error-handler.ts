import { Request, Response, NextFunction } from "express"
import { CustomError } from "../errors/custom-errors";
import { DatabaseConnectionError } from "../errors/database-connection-error";
import { RequestValidationError } from "../errors/request-validation-error";

export const errorhandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log("something went wrong");
    if (err instanceof CustomError) {
        res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }

    res.status(400).send({
        errors: [{ message: 'Something went wrong'}]
    });
};
//make sure all errors return in the same format
