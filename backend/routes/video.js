import express from 'express'

const video = express.Router()
import videoDb from '../models/video.js'

video.get('/videoss', async (req, res) => {

    const video  = await videoDb.find() 
    res.send(video)
})


export default video