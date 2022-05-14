"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const habitController = __importStar(require("../controllers/habits"));
const is_admin_1 = __importDefault(require("../middleware/is-admin"));
const router = (0, express_1.Router)();
// GET /api/habits/
router.get("/", habitController.getHabits);
// GET /api/habits/options
router.get("/options", habitController.getHabitOptions);
// GET /api/habits/:habitId
router.get("/:habitId", habitController.getHabit);
// POST /api/habits/options/add/:category
router.post("/options/add/:category", is_admin_1.default, habitController.addHabitOption);
// DELETE /api/habits/:habitId -> Meant for cleaning up any habits created by Horton/Emily
router.delete("/:habitId", is_admin_1.default, habitController.deleteHabit);
// POST /api/habits/new
router.post("/new", habitController.postHortonHabit, habitController.postNewHabit);
// PATCH /api/habits/:habitId
router.patch("/:habitId", habitController.addHabitEntry);
exports.default = router;
