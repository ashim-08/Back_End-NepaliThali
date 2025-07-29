const express = require("express");
const route = express.Router();
const Order = require("../model/orderModel");
const { jwtAuthMiddleware, generatejwttoken } = require("../jwt");
const User = require("../model/userModel");

route.get("/", async (req, res) => {
  try {
    const orderData = await Order.find();
    res
      .status(200)
      .json({ message: "Data fetch successfully", data: orderData });
  } catch (error) {
    console.log("error");
    res.status(500).json({ message: "Internal server error" });
  }
});

route.post("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    const data = req.body;
    data.contactNumber = user.contactNumber;
    data.cName = user.cName;
    data.city = user.city;
    data.street = user.street;
    data.deliveryDescription = user.deliveryDescription;
    const order = new Order(data);
    const response = await order.save();
    res
      .status(200)
      .json({ message: "{Order Data saved sucessfully", response: response });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
route.patch("/", async (req, res) => {
  try {
    const { id, ...updatedData } = req.body;
    const response = await Order.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    res
      .status(200)
      .json({ message: "Data update successfully", response: response });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
route.delete("/", async (req, res) => {
  try {
    const { id } = req.body;
    await Order.findByIdAndDelete(id);
    res.status(200).json({ message: "order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = route;
