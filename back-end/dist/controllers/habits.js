"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postNewHabit = exports.addHabitEntry = exports.getHabits = exports.addHabitOption = exports.getHabitOptions = void 0;
const axios_1 = __importDefault(require("axios"));
const HabitOption_1 = __importDefault(require("../models/HabitOption"));
const User_1 = __importDefault(require("../models/User"));
const Habit_1 = __importDefault(require("../models/Habit"));
const constants_1 = require("../util/constants");
const getHabitOptions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const options = yield HabitOption_1.default.find();
    res.json({ options });
});
exports.getHabitOptions = getHabitOptions;
const addHabitOption = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const category = constants_1.HOBBY_CATEGORIES.find((cat) => cat === req.params.category) || "general";
    const response = yield axios_1.default.get(constants_1.API_NINJAS_URL + category, {
        headers: {
            "X-Api-Key": process.env.API_NINJAS_KEY,
        },
    });
    const data = response.data;
    const hobby = data.hobby;
    const foundHabit = yield HabitOption_1.default.findOne({ title: hobby });
    if (foundHabit) {
        res.status(422).json({ message: "Already added!" });
    }
    else {
        const option = new HabitOption_1.default({
            title: hobby,
            matchedUsers: [],
            unmatchedUsers: [],
        });
        yield option.save();
        res.json({ message: `Added ${hobby} to options database!`, category });
    }
});
exports.addHabitOption = addHabitOption;
// CHECK THIS
const getHabits = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.userId).populate("habits");
    res.json({ count: user.habits.length, habits: user.habits });
});
exports.getHabits = getHabits;
// TODO
const addHabitEntry = (req, res, next) => {
    console.log("Getting Habits");
};
exports.addHabitEntry = addHabitEntry;
// CHECK THIS
const postNewHabit = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { optionId } = req.body;
    const userId = req.userId;
    const user = yield User_1.default.findById(userId);
    const option = yield HabitOption_1.default.findById(optionId);
    const habit = new Habit_1.default({
        habitType: optionId,
        dateStarted: new Date(),
        user: user._id,
        entries: [],
    });
    let partner;
    if (option.unmatchedUsers.length === 0) {
        option.unmatchedUsers.push(user._id);
    }
    else {
        const { userId: partnerId, habitId: pHabitId } = option.unmatchedUsers.pop();
        const partnerHabit = yield Habit_1.default.findById(pHabitId);
        partnerHabit.partner = userId;
        yield partnerHabit.save();
        partner = yield User_1.default.findById(partnerId);
        option.matchedUsers.push({ userId: user._id, habitId: habit._id });
        option.matchedUsers.push({ userId: partnerId, habitId: pHabitId });
    }
    habit.partner = partner._id;
    yield option.save();
    yield habit.save();
    user.habits.push(habit._id);
    yield user.save();
    res.json({ message: "Posted new habit!", habit });
});
exports.postNewHabit = postNewHabit;
