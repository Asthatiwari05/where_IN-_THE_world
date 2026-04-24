const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    name: String,
    phone: String,
    itemName: String,
    description: String,
    location: String,
    type: String, // 'lost' or 'found'
    image: String
}, { timestamps: true });

module.exports = mongoose.model("Item", itemSchema);