import mongoose from "mongoose";

const Schema = mongoose.Schema;

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

export default mongoose.model("Habit", habitSchema);
