class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

const createNewCustomError = (message, statusCode) => {
    return new CustomError(message, statusCode);
}

module.exports = {CustomError, createNewCustomError}