import express from "express";
import database from "../models/db_test.js";
import login from "./auth.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

router.get("/home", (req, res) => {
  console.log("Cookies: ", req.cookies);
  console.log(database.registered_users);

  const sessionCookie = req.cookies.sessionId || "";
  const [userId, sessionId] = sessionCookie.split("=");

  console.log("Parsed session:", userId, sessionId);

  if (userId && sessionId && login.homepageAuthentication(userId, sessionId)) {
    res.status(200).json({ message: "Welcome to the homepage" });
  } else {
    res.status(401).json({ error: "Unauthorized access" });
  }
});

router.get("/logout", (req, res) => {
  const sessionId = req.cookies.sessionId || false;
  if (sessionId) {
    const user = database.registered_users.find(
      (user) => user.sessionId === sessionId
    );
    if (user) {
      const index = database.registered_users.indexOf(user);
      database.registered_users.splice(index, 1);
    }
  }
  res.clearCookie("sessionId").redirect("/");
});

router.post("/register", (req, res) => {
  const username = req.body.username || req.body.email;
  const password = req.body.password;
  const email = req.body.email;

  try {
    const userExists = database.registered_users.some(
      (user) => user.email === email
    );

    if (userExists) {
      return res.status(409).json({ error: "User already exists" });
    }

    const user_cookie = login.registerUser(username, password, email);

    res
      .cookie("sessionId", user_cookie, { httpOnly: true, maxAge: 3600000 })
      .status(201)
      .json({ message: "User registered successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    if (login.authenticateUser(email, password)) {
        const user = database.registered_users.find(
            (user) => user.email === email
        );

      const cookieValue = login.setCookie(user.email, user.sessionId);
      console.log("Login successful ", cookieValue);

      res
      .cookie("sessionId", cookieValue, {
        httpOnly: true,
        sameSite: "Lax", // Or "None" + HTTPS if needed
        maxAge: 3600000, // 1 hour
      })
        // .cookie("sessionId", cookieValue, { httpOnly: true, maxAge: 3600000 })
        .status(200)
        .json({ message: "Login successful" });

    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
