import express from "express";
import { createPost } from "../controllers/post.controller.js";
import { verifyApiKey } from "../middlewares/auth.middleware.js";
const PostRouter = express.Router();
PostRouter.post("/", verifyApiKey , createPost)
export default PostRouter;