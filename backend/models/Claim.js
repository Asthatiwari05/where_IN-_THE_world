const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema({
    itemId:String,
    claimantName:String,
    reason:String,
    contact:String
},{timestamps:true});

module.exports = mongoose.model("Claim",claimSchema);