const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    itemId: String,
    senderName: String,
    senderPhone: String,
    message: String
}, { timestamps: true });

module.exports = mongoose.model("Message", messageSchema);