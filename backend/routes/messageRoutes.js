const router = require("express").Router();
const Message = require("../models/Message");

// Send a message
router.post("/send", async (req, res) => {
    try {
        const { itemId, senderName, senderPhone, message } = req.body;
        
        if (!itemId || !senderName || !senderPhone || !message) {
            return res.status(400).json({ error: "All fields are required" });
        }
        
        const msg = await Message.create({
            itemId,
            senderName,
            senderPhone,
            message
        });
        
        res.json({ message: "Message Sent Successfully!", msgId: msg._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all messages for an item
router.get("/:itemId", async (req, res) => {
    try {
        const messages = await Message.find({
            itemId: req.params.itemId
        }).sort({ createdAt: -1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;