export class DatabaseConnectionError extends Error {
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
