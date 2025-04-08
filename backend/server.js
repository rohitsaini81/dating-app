import express from 'express';
import cors from 'cors';
import router from './routes/basic.js';
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";
import conDb from './models/con.js';
import users from './routes/crud.js';

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

app.use(cors(
    {
        origin: process.env.ORIGIN || "https://dating-app-eight-sigma.vercel.app", // Replace with your frontend URL
        credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    }
));

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
conDb(process.env.MONGO_URI)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
);