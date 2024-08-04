class ErrorHandler extends  Error {
    constructor(code, message) {
        super();
        this.code = code;
        this.message = message;
    }

    static unAuthorized(message) {
        return new ErrorHandler(401, message);
    }

    static notFound(message) {
        return new ErrorHandler(401, message);
    }

    static conflictError(message) {
        return new ErrorHandler(403, message);
    }
}

module.exports = ErrorHandler;