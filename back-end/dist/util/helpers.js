"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combineEntries = exports.getInitials = void 0;
const getInitials = (fullName) => {
    const nameParts = fullName.split(" ");
    return nameParts.map((n) => n.charAt(0).toUpperCase()).join("");
};
exports.getInitials = getInitials;
const combineEntries = (startDate, userEntries, partnerEntries) => {
    var _a, _b;
    const combinedEntries = [];
    let userIdx = 0;
    let partnerIdx = 0;
    const date = startDate;
    const today = new Date(new Date().toDateString());
    while (date <= today) {
        userIdx = advancePointer(userEntries, userIdx, date);
        partnerIdx = advancePointer(partnerEntries, partnerIdx, date);
        combinedEntries.push({
            date: new Date(date.toDateString()),
            userSuccess: ((_a = userEntries.at(userIdx)) === null || _a === void 0 ? void 0 : _a.toString()) === date.toString(),
            partnerSuccess: ((_b = partnerEntries.at(partnerIdx)) === null || _b === void 0 ? void 0 : _b.toString()) === date.toString(),
        });
        date.setDate(date.getDate() + 1);
    }
    return combinedEntries;
};
exports.combineEntries = combineEntries;
const advancePointer = (entries, pointer, target) => {
    while (entries.length > 0 &&
        pointer < entries.length &&
        entries.at(pointer) < target) {
        pointer++;
    }
    return pointer;
};
