"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const habitOptionSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    matches: [
        {
            userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
            habitId: { type: Schema.Types.ObjectId, ref: "Habit", required: true },
        },
    ],
    remaining: [
        {
            userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
            habitId: { type: Schema.Types.ObjectId, ref: "Habit", required: true },
        },
    ],
});
exports.default = mongoose_1.default.model("Option", habitOptionSchema);
