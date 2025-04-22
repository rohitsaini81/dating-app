import express from 'express';
import videosStream from './models/videosStream.js';
import conDb from './models/con.js';
const app = express();
const port = 3000;
import dotenv from "dotenv";

dotenv.config();
app.get('/', async(req, res) => {
    const data = await videosStream.find();
    console.log(data);
    res.send(data);
});

const uri= "mongodb+srv://"+process.env.URI_PASS+"@cluster0.8t0hk4y.mongodb.net/"+process.env.DATABASE
conDb(uri);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});