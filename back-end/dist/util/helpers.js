"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInitials = void 0;
const getInitials = (fullName) => {
    const nameParts = fullName.split(" ");
    return nameParts.map((n) => n.charAt(0).toUpperCase()).join("");
};
exports.getInitials = getInitials;
