const router = require("express").Router();
const Claim = require("../models/Claim");

router.post("/", async(req,res)=>{
    const claim = await Claim.create(req.body);
    res.json("Claim Submitted");
});

module.exports = router;