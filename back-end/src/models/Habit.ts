import mongoose from "mongoose";

const Schema = mongoose.Schema;

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

export default mongoose.model("Habit", habitSchema);
