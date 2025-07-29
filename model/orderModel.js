const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    totalAmount: {
        type:Number,
    },
    contactNumber:{
        type:String,
    },
    items:{
        itemName:{
            type:String
        },
        quantity:{
            type:String,
        },
    },
    cName:{
        type:String,
    },
    street:{
        type:String,
    },
    deliveryDescription:{
        type:String,
    }
});
const Order = mongoose.model("Order",orderSchema);
module.exports= Order;