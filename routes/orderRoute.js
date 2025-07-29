const express = require("express");
const route = express.Router();
const Order = require("../model/orderModel");

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

route.post("/", async (req, res) => {
  try {
    const data = req.body;
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