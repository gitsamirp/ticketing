import { CustomError } from "./custom-errors";

export class DatabaseConnectionError extends CustomError {
    reason = 'failed Connecting to database';
    statusCode = 500;

    constructor() {
        super();

        // extend built in class
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors() {
        return [
            { message: this.reason }
        ]
    }
}
