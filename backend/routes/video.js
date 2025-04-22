import express from 'express'

const videosRouter = express.Router()
import videoDb from '../models/videosStream.js'





videosRouter.get('/api/stream/search', async (req, res) => {
    const title = req.query.query;
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    try {
        const videos = await videoDb.find({
            title: { $regex: title, $options: 'i' } // 'i' makes it case-insensitive
        });

        if (!videos || videos.length === 0) {
            return res.status(404).json({ error: 'No videos found' });
        }

        res.send(videos);
    } catch (error) {
        console.error('Error searching videos:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});





videosRouter.get('/api/stream/videos/page/:number', async (req, res) => {
    let page = parseInt(req.params.number);
    page = isNaN(page) || page < 1 ? 1 : page;

    const limit = 20;
    const skip = (page - 1) * limit;

    try {
        const [videos, totalVideos] = await Promise.all([
            videoDb.find().skip(skip).limit(limit),
            videoDb.countDocuments()
        ]);

        const totalPages = Math.ceil(totalVideos / limit);

        res.json({
            page,
            totalPages,
            videos
        });
    } catch (error) {
        console.error('Error fetching videos:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


videosRouter.get('/api/stream/category', async (req, res) => {
    const category = req.query.tag;
    if (!category) {
        return res.status(400).json({ error: 'Category is required' });
    }
    try {
        const videos = await videoDb.find({
            tags: { $regex: category, $options: 'i' } // 'i' makes it case-insensitive
        });

        if (!videos || videos.length === 0) {
            return res.status(404).json({ error: 'No videos found in this category' });
        }

        res.send(videos);
    } catch (error) {
        console.error('Error searching videos by category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }


}
);


export default videosRouter