import mongoose from "mongoose";

const Schema = mongoose.Schema;

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

export default mongoose.model("Option", habitOptionSchema);
