---

LoveLink – A Modern Dating App (MERN Stack)

LoveLink is a full-featured dating app built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It offers a seamless user experience for discovering and connecting with potential matches.

Features

User authentication (JWT + bcrypt)

Swipe-based match system (Tinder-style)

Real-time chat with matched users (Socket.io)

Profile creation with image upload

Location-based matching

Responsive design for mobile & desktop


Tech Stack

Frontend: React.js, Redux, Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB (Mongoose)

Authentication: JWT, bcrypt

Real-Time Chat: Socket.io

File Uploads: Multer, Cloudinary

Deployment: Vercel (Frontend) & Render/Heroku (Backend)


Screenshots

(Include a few screenshots of your app here if possible)

Getting Started

Prerequisites

Node.js & npm

MongoDB Atlas or local MongoDB

Cloudinary (for image uploads)


Installation

1. Clone the repository:



git clone https://github.com/rohitsaini81/lovelink.git
cd lovelink

2. Set up the backend:



cd server
npm install

Create a .env file in the server/ directory with the following:

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

Start the backend:

npm run dev

3. Set up the frontend:



cd ../client
npm install
npm start

Deployment

Frontend: Deployed via Vercel

Backend: Deployed on Render/Heroku

MongoDB: Hosted on MongoDB Atlas


Folder Structure

/client     → React frontend
/server     → Express backend & APIs

Future Improvements

Push notifications

Video chat integration

Advanced search filters

Premium features with Stripe


License

This project is licensed under the MIT License.


---

Let me know your app name and any custom features you added—I can tailor it even more specifically.

