import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    description: {
        type: String},
    video_url: {
        type: String,
        required: true,
    },
    img_url: {
        type: String,
        required: true,
    },
    tags: {
        type: [String]
    },
    category: {
        type: [String], // also array of strings
    },
    duration: {
        type: String,
    },
    
});

export default mongoose.model('xxxvideos', videoSchema);
