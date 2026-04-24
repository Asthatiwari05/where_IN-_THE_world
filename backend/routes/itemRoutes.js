const router = require("express").Router();
const Item = require("../models/item");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
});

const upload = multer({ storage });

// Report a lost or found item
router.post("/report", upload.single("image"), async (req, res) => {
    try {
        const item = new Item({
            name: req.body.name,
            phone: req.body.phone,
            itemName: req.body.itemName,
            description: req.body.description,
            location: req.body.location,
            type: req.body.type,
            image: req.file ? req.file.filename : ""
        });

        await item.save();
        res.json({ message: "Item Reported Successfully!", itemId: item._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Fetch all items
router.get("/", async (req, res) => {
    try {
        const items = await Item.find().sort({ createdAt: -1 });
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single item by ID
router.get("/:id", async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Search items by name, description, or location
router.get("/search/:keyword", async (req, res) => {
    try {
        const keyword = req.params.keyword;
        const items = await Item.find({
            $or: [
                { itemName: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
                { location: { $regex: keyword, $options: "i" } }
            ]
        }).sort({ createdAt: -1 });
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

module.exports = router;