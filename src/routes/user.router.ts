import express, { request, response } from "express";
import { deleteAccount, getProfile, logout, socail_login, updateUserData, } from "../controllers/user.controller";
import { getUserSchema, deleteUserSchema, updateUserDataSchema, socailLoginSchema } from "../schema/user.schema";
import { validate } from "../middleware/validate.middleware";
import { authMiddleware } from "../middleware/auth.middleware";
import upload from "../middleware/uploadImage";
const userRouter = express.Router();

userRouter.post('/social_login', validate(socailLoginSchema), socail_login);
userRouter.get('/userdata', authMiddleware, validate(getUserSchema), getProfile);
userRouter.put(
    '/updateUserData',
    authMiddleware,
    upload.fields([
        { name: 'profileImage', maxCount: 1 },
        { name: 'coverImage', maxCount: 1 },
    ]),
    validate(updateUserDataSchema),
    updateUserData
);
userRouter.delete('/deleteAccount', authMiddleware, validate(deleteUserSchema), deleteAccount);
userRouter.post('/logout', authMiddleware, logout);







export default userRouter;