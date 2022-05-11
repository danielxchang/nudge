"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const habitOptionsSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    matchedUsers: [
        { userId: { type: Schema.Types.ObjectId, ref: "User", required: true } },
    ],
    unmatchedUsers: [
        { userId: { type: Schema.Types.ObjectId, ref: "User", required: true } },
    ],
});
exports.default = mongoose_1.default.model("Options", habitOptionsSchema);
