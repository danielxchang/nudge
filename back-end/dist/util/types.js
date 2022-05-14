"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponse = void 0;
class ErrorResponse extends Error {
    constructor(message, statusCode, field) {
        super(message);
        this.statusCode = statusCode;
        this.field = field;
    }
}
exports.ErrorResponse = ErrorResponse;
