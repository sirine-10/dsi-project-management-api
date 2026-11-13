require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middlewares/authMiddleware");


const app = express();
//ay route jdid endpoint nhoteha fi server bsh yfehm fi url w ykhdem biha
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/projects", require("./routes/projectRoutes"));
app.get("/", (req, res) => {
  res.json({ message: "DSI API is running!" });
});

app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Acces autorise",
    user: req.user
  });

});
const startServer = async () => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET manquant");
  }

  await connectDB();

  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
};

startServer().catch((error) => {
  console.error("Startup failed:", error.message);
  process.exit(1);
});