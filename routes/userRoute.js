const express = require("express");
const route = express.Router();
const User = require("../model/userModel");
const { jwtAuthMiddleware, generatejwttoken } = require("../jwt");

route.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const user = new User(data);
    let response = await user.save();
    const payload = {
      id: response.id,
      userName: response.userName,
      email: response.email,
    };
    const token = generatejwttoken(payload);

    user.token = token;
    response = await user.save();

    res
      .status(200)
      .json({ message: "User created successfully", response: response });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
});

route.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName: userName });
    if (!user || !(await user.comparePassword(password))) {
      res.status(400).json({ message: "user or password is invalid" });
    }
    res.status(200).json({
      message: "Login successful",
      response: user.token,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
});

route.delete("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
});

route.patch("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const { prevPassword, currentPassword } = req.body;
    const userId = await req.user.id;
    const user = await User.findById(userId);
    if (!(await user.comparePassword(prevPassword))) {
      return res.status(502).json({ message: "Invalid password" });
    }
    user.password = currentPassword;
    await user.save();
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
});

module.exports = route;
