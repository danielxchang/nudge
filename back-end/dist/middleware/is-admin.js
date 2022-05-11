"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../util/types");
const isAdmin = (req, res, next) => {
    if (req.userId !== process.env.ADMIN_ID) {
        const error = new types_1.ErrorResponse("Not authenticated.", 401);
        throw error;
    }
    next();
};
exports.default = isAdmin;
