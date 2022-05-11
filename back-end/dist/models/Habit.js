"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const habitSchema = new Schema({
    habitType: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Options",
    },
    dateStarted: {
        type: Date,
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    partner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    entries: [
        {
            date: { type: Date, required: true },
            userSuccess: { type: Boolean, required: true, default: false },
            partnerSuccess: { type: Boolean, required: true, default: false },
        },
    ],
});
exports.default = mongoose_1.default.model("Habit", habitSchema);
