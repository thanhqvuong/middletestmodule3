import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UsersRouter from "./routes/users.routes.js";
import PostRouter from "./routes/post.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 1000;

// ✅ Middleware để parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // optional, nếu cần xử lý form

// ✅ Connect MongoDB
mongoose.connect(process.env.MongoDBURL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Routes
app.use('/users', UsersRouter);
app.use("/posts" , PostRouter);

// ✅ Server start
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
