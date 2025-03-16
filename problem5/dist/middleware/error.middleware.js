"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    res.status(status).json({
        success: false,
        error: message,
        statusCode: status
    });
};
exports.errorHandler = errorHandler;
