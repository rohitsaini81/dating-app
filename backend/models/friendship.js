import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  friendId: { type: String, required: true },
  friendName: { type: String, required: true },
  friendProfliePic: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
});

export default mongoose.model("friendships", userSchema);
