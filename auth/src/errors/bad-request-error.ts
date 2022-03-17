import { CustomError } from "./custom-errors";

export class BadRequestError extends CustomError {
    statusCode = 400;

    constructor(public errorMessage: string) {
        super();

        // extend built in class
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeErrors() {
        return [
            { message: this.errorMessage }
        ]
    }
}
