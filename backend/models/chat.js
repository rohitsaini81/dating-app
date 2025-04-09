import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    friendId: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
    });
export default mongoose.model('chats', userSchema);