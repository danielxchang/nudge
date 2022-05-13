"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../util/constants");
const isHorton = (req, res, next) => {
    req.body = constants_1.HORTON_CREDENTIALS;
    next();
};
exports.default = isHorton;
