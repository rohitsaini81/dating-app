import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    video_url: {
        type: String,
        required: true,
    },
    img_url: {
        type: String,
        required: true,
    },
    tags: {
        type: [String], // array of strings
        default: [],
    },
    category: {
        type: [String], // also array of strings
        default: [],
    },
    duration: {
        type: String, // changed to string to match "19 minutes"
        required: false,
    },
    
});

export default mongoose.model("xxxvideos", videoSchema);
