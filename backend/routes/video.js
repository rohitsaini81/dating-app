import express from 'express'

const video = express.Router()
import videoDb from '../models/video.js'

video.get('/videoss', async (req, res) => {

    const videos  = await videoDb.find() 
    res.send(videos)
})


export default video