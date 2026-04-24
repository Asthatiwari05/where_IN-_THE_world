console.log("Server file started...");

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

console.log("Modules loaded");

const app = express();

app.use(cors());
app.use(express.json());

console.log("Middleware set");
app.use("/uploads", express.static("uploads"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

console.log("After DB connect");

const itemRoutes = require("./routes/itemRoutes");
app.use("/api/items", itemRoutes);

console.log("Routes loaded");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});