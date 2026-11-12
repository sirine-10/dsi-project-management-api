require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const app = express();
const PORT = 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "DSI API is running!" });
});
const startServer = async () => {
    await connectDB();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
};
startServer();