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
        ref: "Option",
    },
    startDate: {
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
    partnerHabit: {
        type: Schema.Types.ObjectId,
        ref: "Habit",
    },
    entries: [{ type: Date, required: true }],
});
exports.default = mongoose_1.default.model("Habit", habitSchema);
