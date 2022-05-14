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
exports.deleteHabit = exports.postHortonHabit = exports.postNewHabit = exports.addHabitEntry = exports.getHabit = exports.getHabits = exports.addHabitOption = exports.getHabitOptions = void 0;
const axios_1 = __importDefault(require("axios"));
const HabitOption_1 = __importDefault(require("../models/HabitOption"));
const User_1 = __importDefault(require("../models/User"));
const Habit_1 = __importDefault(require("../models/Habit"));
const constants_1 = require("../util/constants");
const types_1 = require("../util/types");
const helpers_1 = require("../util/helpers");
const getHabitOptions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const options = yield HabitOption_1.default.find();
        res.json({
            options: options.map((option) => {
                return { id: option._id, title: option.title };
            }),
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});
exports.getHabitOptions = getHabitOptions;
const addHabitOption = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
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
            throw new types_1.ErrorResponse("Already added!", 422);
        }
        else {
            const option = new HabitOption_1.default({
                title: hobby,
                matches: [],
                remaining: [],
            });
            yield option.save();
            res.json({ message: `Added ${hobby} to options database!`, category });
        }
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});
exports.addHabitOption = addHabitOption;
const getHabits = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.userId).populate({
            path: "habits",
            populate: [
                {
                    path: "habitType",
                    model: "Option",
                    select: "title",
                },
                { path: "user", model: "User", select: "initials" },
                { path: "partner", model: "User", select: "initials" },
            ],
        });
        const userHabits = user.habits.map((h) => {
            return Object.assign({ id: h._id, title: h.habitType.title, startDate: h.startDate, user: h.user.initials }, (h.partner && { partner: h.partner.initials }));
        });
        res.json({ habits: userHabits });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});
exports.getHabits = getHabits;
const getHabit = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const { habitId } = req.params;
    try {
        const habit = yield Habit_1.default.findById(habitId)
            .populate("user", "initials")
            .populate("partner", "initials")
            .populate("habitType", "title")
            .populate("partnerHabit", "entries");
        if (habit.user.id !== userId)
            throw new types_1.ErrorResponse("Unauthorized Habit!", 401);
        if (!habit.partner) {
            return res.json({ habit });
        }
        const entries = (0, helpers_1.combineEntries)(habit.startDate, habit.entries, habit.partnerHabit.entries);
        res.json({
            id: habit.id,
            title: habit.habitType.title,
            user: habit.user.initials,
            partner: habit.partner.initials,
            entries,
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});
exports.getHabit = getHabit;
const addHabitEntry = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = req.userId;
    const { habitId } = req.params;
    try {
        const habit = yield Habit_1.default.findById(habitId).populate("partnerHabit", "entries");
        if (habit.user.toString() !== userId)
            throw new types_1.ErrorResponse("Unauthorized Habit!", 401);
        const today = new Date(new Date().toDateString());
        if (((_a = habit.entries.at(-1)) === null || _a === void 0 ? void 0 : _a.toString()) === today.toString()) {
            throw new types_1.ErrorResponse("Already added today's entry!", 409);
        }
        const newEntry = today;
        habit.entries.push(newEntry);
        yield habit.save();
        const entries = (0, helpers_1.combineEntries)(habit.startDate, habit.entries, habit.partnerHabit.entries);
        res.json({ ok: true, entries });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});
exports.addHabitEntry = addHabitEntry;
const postNewHabit = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { optionInput } = req.body;
    const userId = req.userId;
    try {
        const user = yield User_1.default.findById(userId);
        const option = yield HabitOption_1.default.findOne({ title: optionInput });
        const remaining = option.remaining;
        const habit = new Habit_1.default({
            habitType: option._id,
            user: user._id,
            entries: [],
        });
        user.habits.push(habit._id);
        let partnerIdx;
        if (req.isHorton) {
            const emily = yield User_1.default.findOne({ email: constants_1.EMILY_CREDENTIALS.email });
            partnerIdx = remaining.findIndex(({ userId: uid }) => uid.toString() === emily._id.toString());
        }
        else {
            partnerIdx = remaining.findIndex(({ userId: uid }) => uid.toString() !== userId);
        }
        if (partnerIdx === -1) {
            remaining.push({ userId: user._id, habitId: habit._id });
        }
        else {
            const today = new Date(new Date().toDateString());
            const { userId: partnerId, habitId: pHabitId } = remaining.splice(partnerIdx, 1)[0];
            const partnerHabit = yield Habit_1.default.findById(pHabitId);
            option.matches.push({ userId: user._id, habitId: habit._id }, { userId: partnerId, habitId: pHabitId });
            partnerHabit.partner = userId;
            partnerHabit.partnerHabit = habit._id;
            partnerHabit.startDate = today;
            yield partnerHabit.save();
            habit.partner = partnerId;
            habit.partnerHabit = pHabitId;
            habit.startDate = today;
        }
        yield option.save();
        yield habit.save();
        yield user.save();
        res.json({ ok: true, habitId: habit._id });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});
exports.postNewHabit = postNewHabit;
const postHortonHabit = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.isHorton)
        return next();
    const { optionInput } = req.body;
    try {
        const emily = yield User_1.default.findOne({ email: constants_1.EMILY_CREDENTIALS.email });
        const option = yield HabitOption_1.default.findOne({ title: optionInput });
        const emilyHabit = new Habit_1.default({
            habitType: option._id,
            user: emily._id,
            entries: [],
        });
        emily.habits.push(emilyHabit._id);
        option.remaining.push({ userId: emily._id, habitId: emilyHabit._id });
        yield emilyHabit.save();
        yield emily.save();
        yield option.save();
        return next();
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});
exports.postHortonHabit = postHortonHabit;
const deleteHabit = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { habitId } = req.params;
    try {
        const user = yield User_1.default.findOne({ email: constants_1.HORTON_CREDENTIALS.email });
        user.habits = user.habits.filter((habit) => habit.toString() !== habitId);
        yield user.save();
        const habit = yield Habit_1.default.findById(habitId);
        const hasPartner = habit.partner;
        const habitOption = yield HabitOption_1.default.findById(habit.habitType);
        if (hasPartner) {
            const partner = yield User_1.default.findById(habit.partner);
            partner.habits = partner.habits.filter((h) => h.toString() !== habit.partnerHabit.toString());
            yield partner.save();
            yield Habit_1.default.findByIdAndDelete(habit.partnerHabit);
            habitOption.matches = habitOption.matches.filter((match) => {
                return (match.habitId.toString() !== habitId &&
                    match.habitId.toString() !== habit.partnerHabit.toString());
            });
        }
        else {
            habitOption.remaining = habitOption.remaining.filter((match) => match.habitId.toString() !== habitId);
        }
        yield habitOption.save();
        yield Habit_1.default.findByIdAndRemove(habitId);
        res.json({ message: "Deleted successfully!" });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});
exports.deleteHabit = deleteHabit;
