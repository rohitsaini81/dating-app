import express from "express";
const users = express.Router();
import multer from "multer";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import AWS from "aws-sdk";
import usersDb from "../models/project.js";
import login from "./auth.js";

users.get("/users", async (req, res) => {
  try {
    const users = await usersDb.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const verify = async (req, res, next) => {
  const sessionId = req.cookies.sessionId; // lowercase 'sessionId' to match cookie name

  if (!sessionId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const user = await usersDb.findOne({ sessionId: sessionId });
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = user;
    next(); // ✅ Fix: removed extra parentheses
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
users.get("/logout", async (req, res) => {
  console.log("cookie");
  const sessionId = req.cookies.SessionId;
  if (!sessionId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const user = await usersDb.findOne({ sessionId: sessionId });
    console.log(user);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    await usersDb.findByIdAndUpdate(
      user._id,
      { sessionId: null },
      { new: true }
    );
    res.clearCookie("SessionId");
    res.json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

users.get("/verify", async (req, res) => {
  const sessionId = req.cookies.SessionId;
  if (!sessionId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const user = await usersDb.findOne({ sessionId: sessionId });
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

users.get("/user/profile", async (req, res) => {
  const sessionId = req.cookies.SessionId;
  if (!sessionId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const user = await usersDb.findOne({ sessionId: sessionId });
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    console.log(user);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

users.get("/create", async (req, res) => {
  try {
    const user = {
      username: "rohit saini",
      email: "rohit1322saini@gmail.com",
      password: "admin123",
    };
    const test = await usersDb.find({ email: user.email });
    if (test) {
      return res.json({ error: "User Already Exists" });
    }
    const users = await usersDb.create(user);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

users.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Please enter all fields" });
  }

  try {
    const user = await usersDb.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials !" });
    }
    if (user.password !== password) {
      return res.status(400).json({ error: "Invalid credentials 2" });
    }
    const token = login.generateSessionId();
    const updatedUser = await usersDb.findByIdAndUpdate(
      user._id,
      { sessionId: token },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(500).json({ error: "Failed to update Login" });
    }
    console.log(updatedUser);
    res
      .cookie("SessionId", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      })
      .status(200)
      .json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const upload = multer({ dest: "uploads/" });

// Configure R2
const s3 = new AWS.S3({
  endpoint: process.env.R2_ENDPOINT,
  accessKeyId: process.env.R2_ACCESS_KEY,
  secretAccessKey: process.env.R2_SECRET_KEY,
  signatureVersion: "v4",
});

users.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const bucketName = process.env.R2_BUCKET_NAME;
    console.log(bucketName)
    const filePath = req.file.path;
    const originalName = req.file.originalname;
    const fileContent = fs.readFileSync(filePath);}
catch (error) {
      console.error(`❌ Failed to read file: ${error.message}`);
      return res.status(500).json({ error: "Failed to read file" });
    }

 
    res.status(200).json({ message: "File uploaded successfully" });
  

});

export default users;
