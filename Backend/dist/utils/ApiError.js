class ApiError extends Error {
    statusCode;
    errors;
    data;
    success;
    constructor(statusCode, message = "something went wrong", errors = [], stack = "" // It helps you understand where the error happened in your code
    ) {
        super(message); // calls the base Error constructor with the message
        this.statusCode = statusCode,
            this.message = message,
            this.errors = errors,
            this.data = null,
            this.success = false;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
export { ApiError };
