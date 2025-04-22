import express from 'express';
import cors from 'cors';
import router from './routes/basic.js';
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";
import conDb from './models/con.js';
import users from './routes/crud.js';
import videosRouter from './routes/video.js';
const app = express();
const PORT = process.env.PORT || 3001;
const ORIGIN = process.env.ORIGIN
const ORIGIN2 = process.env.ORIGIN2

dotenv.config();



const allowedOrigins = [
    ORIGIN || "https://www.swipematch.online",
    ORIGIN2 || "https://xxxvideoss.site"
  ];
  
  app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  }));
  

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 


app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);
app.get('/api', (req, res) => {
    res.json({ message: 'Hello from the API!' });
});
// app.use(router)
app.use(users)
app.use(videosRouter)

const MONGO_URI= "mongodb+srv://"+process.env.URI_PASS+"@cluster0.8t0hk4y.mongodb.net/"+process.env.DATABASE

conDb(MONGO_URI)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
);