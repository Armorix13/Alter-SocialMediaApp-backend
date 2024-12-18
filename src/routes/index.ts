import express from "express";
import userRouter from "./user.router";
import postRouter from "./post.router";
const router = express.Router();


router.use('/user',userRouter);
router.use('/post',postRouter);

export default router;
