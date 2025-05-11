import express from "express";
import { createPost } from "../controllers/post.controller.js";
import { verifyApiKey } from "../middlewares/auth.middleware.js";
import { updatePost } from "../controllers/updatepost.controller.js";
const PostRouter = express.Router();
PostRouter.post("/", verifyApiKey , createPost);
PostRouter.patch("/:id" , verifyApiKey , updatePost);
export default PostRouter;