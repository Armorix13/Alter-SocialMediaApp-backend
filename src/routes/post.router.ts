import express from "express";
import { validate } from "../middleware/validate.middleware";
import upload from "../middleware/uploadImage";
import { CreatePostSchema, updatePostSchema, deletePostSchema } from "../schema/post.schema";
import { createPost, deletePost, editPost, getAllPost, likeDisLikePost } from "../controllers/post.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const postRouter = express.Router();

postRouter.post('/create', authMiddleware, upload.array('images', 5), validate(CreatePostSchema), createPost);
postRouter.get('/get', authMiddleware, getAllPost);
postRouter.get('/get/:id', authMiddleware, getAllPost);
postRouter.put('/update/:id', authMiddleware, upload.array('images', 5), validate(updatePostSchema), editPost);
postRouter.delete('/delete/:id', authMiddleware, validate(deletePostSchema), deletePost);
postRouter.put('/likDislike/:id', authMiddleware, validate(deletePostSchema), likeDisLikePost);


export default postRouter