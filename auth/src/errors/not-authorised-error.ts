import { CustomError } from "./custom-errors";

export class NotAuthorisedError extends CustomError {
    statusCode = 401;

    constructor() {
        super();

        Object.setPrototypeOf(this, NotAuthorisedError.prototype)
    }

    serializeErrors() {
        return [{ message: 'Not Authorised '}]
    }
}