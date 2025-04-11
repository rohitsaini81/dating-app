import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true},
  gender: { type: String, required: false },
  interests: [{ type: String, required: false }],
  profilePic: { type: String, required:false },
  bio: { type: String, default: "" },
  posts:[{type:String,default:"",required:false}],
  
  
  password: { type: String, required: true },
  sessionId: { type: String, required: false },
  loginAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
  // isVerified: { type: Boolean, default: false },
});

export default mongoose.model('users', userSchema);