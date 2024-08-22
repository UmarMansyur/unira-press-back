class ErrorHandler extends  Error {
    constructor(code, message) {
        super();
        this.code = code;
        this.message = message;
    }

    static unAuthorized(message) {
        throw new ErrorHandler(401, message);
    }

    static notFound(message) {
        throw new ErrorHandler(401, message);
    }

    static badRequest(message) {
        throw new ErrorHandler(400, message);
    }

    static conflictError(message) {
        throw new ErrorHandler(403, message);
    }
}

module.exports = ErrorHandler;