import express from "express";
const users = express.Router();
import multer from "multer";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import AWS from "aws-sdk";
import usersDb from "../models/project.js";
import friendShipsDb from "../models/friendship.js";
import chatsDb from "../models/chat.js";
import login from "./auth.js";
import { uploadFile } from "../methods/upload.js";

users.get("/users", async (req, res) => {
  let sessionId = req.headers.authorization;
  if (sessionId) {
    sessionId = sessionId.split(" ")[1]; // Extract the token from the "Bearer" prefix
  } else {
    sessionId = req.cookies.SessionId; // Fallback to cookie
  }

  const user = await usersDb.findOne({ sessionId: sessionId });
  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  // check if profile is complete

  if (!user.gender || !user.interests || !user.profilePic || !user.bio) {
    return res.status(400).json({ error: "Please complete your profile" });
  }


  
  
  try {
    const users = await usersDb.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



const verify = async (req, res, next) => {
  let sessionId = req.headers.authorization;
  if (sessionId) {
    sessionId = sessionId.split(" ")[1]; // Extract the token from the "Bearer" prefix
  } else {
    sessionId = req.cookies.SessionId; // Fallback to cookie
  }

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



// const verify = async (req, res, next) => {
//   const sessionId = req.cookies.SessionId; // lowercase 'sessionId' to match cookie name

//   if (!sessionId) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }

//   try {
//     const user = await usersDb.findOne({ sessionId: sessionId });
//     if (!user) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }

//     req.user = user;
//     next(); // ✅ Fix: removed extra parentheses
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
users.get("/logout", async (req, res) => {
  // console.log("cookie");
  const sessionId = req.cookies.SessionId;
  if (!sessionId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const user = await usersDb.findOne({ sessionId: sessionId });
    // console.log(user);
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






users.post("/verify", async (req, res) => {
  let sessionId = req.headers.authorization;
  if (sessionId) {
    sessionId = sessionId.split(" ")[1]; // Extract the token from the "Bearer" prefix
  } else {
    sessionId = req.cookies.SessionId; // Fallback to cookie
  }
  if (!sessionId) {
    console.log("no session id");
    return res.status(401).json({ error: "Unauthorized" });
  }


  try {
    const user = await usersDb.findOne({ sessionId: sessionId });
    if (!user) {
      console.log(user)
      return res.status(401).json({ error: "Unauthorized" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

users.get("/user/profile", async (req, res) => {

  let sessionId = req.headers.authorization;
  if (sessionId) {
    sessionId = sessionId.split(" ")[1]; // Extract the token from the "Bearer" prefix
  } else {
    sessionId = req.cookies.SessionId; // Fallback to cookie
  }
  if (!sessionId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const user = await usersDb.findOne({ sessionId: sessionId });
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    // console.log(user);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//  update user details
users.put("/user/update", async (req, res) => {
  let sessionId = req.headers.authorization;
  if (sessionId) {
    sessionId = sessionId.split(" ")[1]; // Extract the token from the "Bearer" prefix
  } else {
    sessionId = req.cookies.SessionId; // Fallback to cookie
  }
  if (!sessionId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const user = await usersDb.findOne({ sessionId: sessionId });
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const updateFields = {};

    // Dynamically add fields to update
    const allowedFields = ["username", "bio", "profilePic", "gender", "interests"];
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updateFields[field] = req.body[field];
      }
    }

    if (typeof req.body.interests === "string") {
      updateFields.interests = req.body.interests.split(",");
    }
    if (typeof req.body.posts === "string") {
      updateFields.posts = req.body.posts.split(",");
    }    

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ error: "No valid fields to update" });
    }

    const updatedUser = await usersDb.findByIdAndUpdate(user._id, updateFields, { new: true });

    if (!updatedUser) {
      return res.status(500).json({ error: "Failed to update user" });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



users.post("/user/create", async (req, res) => {
  try {
    const {email,username,password} =await  req.body
    if(!email || !username || !password){
      res.json({message:"all field are madnangory"})
    }
    const test = await usersDb.findOne({ email: email });
    if (test) {
      console.log(test)
      return res.json({ error: "User Already Exists" });
    }

    console.log("creating...")

    const user={
      username:username,
      email:email,
      password:password,
    }
    const users = await usersDb.create(user);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

users.post("/login", async (req, res) => {
  if(!req.body){
    return res.status(400).json({ error: "Please enter all fields" });
  }
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "Please enter all fields" });
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
    // console.log(updatedUser);
    res
      .cookie("SessionId", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
        secure: true,
        sameSite: "None",
      })
      .status(200)
      .json({ message: "Login successful",token });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});

const storage = multer.memoryStorage();
const upload = multer({ storage });
import { v4 as uuidv4 } from 'uuid';




users.post("/upload", upload.single("file"), async (req, res) => {

  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    //verify user 
    const sessionId = req.cookies.SessionId;
    if (!sessionId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const user = await usersDb.findOne({ sessionId: sessionId });
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    // Check file type

    // Generate a unique filename
    const ext = path.extname(req.file.originalname);
    const uniqueFilename = `upload-${uuidv4()}${ext}`;
    const savePath = `/tmp/${uniqueFilename}`;

    // Save file temporarily
    fs.writeFileSync(savePath, req.file.buffer);

    // Upload to Cloudflare R2
    const uploadedFileName = await uploadFile(savePath);
    console.log(uploadedFileName);

    const updatedUser = await usersDb.findByIdAndUpdate(
      user._id,
      { $push: { posts: uploadedFileName } },
      { new: true }
    );
    if (!user) {
      return res.status(500).json({ error: "Failed to update user" });
    }
    // Remove temporary file



  } catch (error) {
    console.error(`❌ Upload error: ${error.message}`);
    res.status(500).json({ error: "Failed to upload file" });
  }
});



// friendship database routes ---->
users.post("/user/add/friend",verify, async (req, res) => {

  let sessionId = req.headers.authorization;
  if (sessionId) {
    sessionId = sessionId.split(" ")[1]; // Extract the token from the "Bearer" prefix
  } else {
    sessionId = req.cookies.SessionId; // Fallback to cookie
  }
  if (!sessionId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const userData = await usersDb.findOne({ sessionId: sessionId });
  if (!userData) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const { userId} = req.body;
  if (!userId) {
    return res.status(400).json({ error: "Please enter all fields" });
  }
  const friendData = await usersDb.findOne({ _id: userId });
  if (!friendData) {
    return res.status(400).json({ error: "Friend not found" });
  }
  try{
    const response = await friendShipsDb.create({
      userId: userData._id,
      friendId: friendData._id,
    });
    if (!response) {
      return res.status(500).json({ error: "Failed to add friend" });
    }
    res.json(response);
  }catch(error){
    // console.log(error.message);
    res.status(500).json(error.message);
  }
}
);

// list all friends 
users.get("/user/friends", verify, async (req, res) => {
  let sessionId = req.headers.authorization;
  if (sessionId) {
    sessionId = sessionId.split(" ")[1]; // Extract the token from the "Bearer" prefix
  } else {
    sessionId = req.cookies.SessionId; // Fallback to cookie
  }


  
  if (!sessionId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const userData = await usersDb.findOne({ sessionId: sessionId });
  if (!userData) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const friends = await friendShipsDb
    .find({ userId: userData._id })
    .populate("friendId");
  res.send(friends);
}
);

// list all friends for chat with request accepted
users.get("/user/friends/accepted", verify, async (req, res) => {
  const sessionId = req.cookies.SessionId;
  if (!sessionId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const userData = await usersDb.findOne({ sessionId: sessionId });
  if (!userData) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const friendList = await friendShipsDb
    .find({ userId: userData._id, status: "accepted" })
    .populate("friendId");
  res.send(friendList);
}
);

// accept request
users.get("/user/friends/accept/:id", verify, async (req, res) => {
  const sessionId = req.cookies.SessionId;
  const friendId = req.params.id;
  if (!friendId) {
    return res.status(400).json({ error: "Friend ID is required" });
  }
  if (!sessionId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const userData = await usersDb.findOne({ sessionId: sessionId });
  if (!userData) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const friendData = await friendShipsDb.findById(req.params.id);
  if (!friendData) {
    return res.status(400).json({ error: "Friend not found" });
  }
  const response = await friendShipsDb.findByIdAndUpdate(
    req.params.id,
    { status: "accepted" },
    { new: true }
  );
  if (!response) {
    return res.status(500).json({ error: "Failed to update friend" });
  }
  res.send(response);
}
);


// get friend by id 
users.get("/user/friends/:id", verify, async (req, res) => {
  const sessionId = req.cookies.SessionId;
  if (!sessionId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const userData = await usersDb.findOne({ sessionId: sessionId });
  if (!userData) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const friends = await friendShipsDb
    .find({ userId: req.params.id })
    .populate("friendId");
  res.send(friends);
}
);






// chats database routes ---->


users.post("/user/add/chat", verify, async (req, res) => {
})
export default users;
