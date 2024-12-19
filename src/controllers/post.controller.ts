import { NextFunction, Request, Response } from "express";
import mongoose, { ObjectId, FilterQuery } from "mongoose";
import { ERROR, SUCCESS } from "../utils/response";
import { Ieditpost, Ipost } from "../types/Request Body/post/types";
import PostModel from "../models/post.model";
import { IeditPostParamsType } from "../types/Request Params/post/types";

export const createPost = async (req: Request<{}, {}, Ipost>, res: Response, next: NextFunction): Promise<any> => {
    try {
        let { desc } = req.body;
        console.log("req.body", req.body)
        const post = await PostModel.create({ desc, userId: req.userId });

        console.log("req.file", req.file)
        if (req.files && Array.isArray(req.files)) {
            post.images = req.files.map((file) => `/uploads/${file.filename}`);
        }
        await post.save();
        return SUCCESS(res, 200, "Create sucessfully", { post });
    } catch (error: any) {
        console.log(error)
        return ERROR(res, 500, error?.message, error);
    }
};
//get all Categories

export const getMyPosts = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const userId = new mongoose.Types.ObjectId(req.userId as string);
        const id = req.params.id;
        if (id) {
            const post = await PostModel.findById(id).lean().populate("userId", "fullName profileImage email coverImage boi");
            if (!post) {
                return ERROR(res, 404, "post not found", {});
            }
            const haveILiked = post.likeCount.some(
                likeId => likeId.toString() === userId.toString()
            );
            const likeCount = post.likeCount.length;
            return SUCCESS(res, 200, "Get Post successfully", {
                posts: { ...post, haveILiked, likeCount }
            })

        }
        const page = parseInt(req.query.page as string) || 1;
        const hashTag = req.query.page as string;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const qry: FilterQuery<typeof PostModel> = {
            userId,
        };

        if (hashTag) {
            qry.desc = { $regex: `#${hashTag}`, $options: "i" };
        }
        const posts = await PostModel.find(qry)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean().populate("userId", "fullName profileImage email coverImage boi");

        const totalPosts = await PostModel.countDocuments({ userId });
        const updatedPosts = posts.map(post => {
            const likeCount = post.likeCount.length; // Total likes
            const haveILiked = post.likeCount.some(
                likeId => likeId.toString() === userId.toString() // Compare ObjectId as strings
            );
            return {
                ...post,
                likeCount,
                haveILiked,
            };
        });
        return SUCCESS(res, 200, "Get all Post successfully", {
            posts: updatedPosts,
            pagination: {
                totalPosts,
                currentPage: page,
                totalPages: Math.ceil(totalPosts / limit),
                limit,
            },
        });
    } catch (error: any) {
        console.error(error);
        return ERROR(res, 500, error?.message, error);
    }
}

export const getAllPost = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const userId = new mongoose.Types.ObjectId(req.userId as string);
        const id = req.params.id;
        if (id) {
            const post = await PostModel.findById(id).lean().populate("userId", "fullName profileImage email coverImage boi");
            if (!post) {
                return ERROR(res, 404, "post not found", {});
            }
            const haveILiked = post.likeCount.some(
                likeId => likeId.toString() === userId.toString()
            );
            const likeCount = post.likeCount.length;
            return SUCCESS(res, 200, "Get Post successfully", {
                posts: { ...post, haveILiked, likeCount }
            })

        }
        const page = parseInt(req.query.page as string) || 1;
        const hashTag = req.query.page as string;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const qry: FilterQuery<typeof PostModel> = {
        };

        if (hashTag) {
            qry.desc = { $regex: `#${hashTag}`, $options: "i" };
        }
        const posts = await PostModel.find(qry)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean().populate("userId", "fullName profileImage email coverImage boi");

        const totalPosts = await PostModel.countDocuments();


        const updatedPosts = posts.map(post => {
            const likeCount = post.likeCount.length; // Total likes
            const haveILiked = post.likeCount.some(
                likeId => likeId.toString() === userId.toString() // Compare ObjectId as strings
            );
            return {
                ...post,
                likeCount,
                haveILiked,
            };
        });


        return SUCCESS(res, 200, "Get all Post successfully", {
            posts: updatedPosts,
            pagination: {
                totalPosts,
                currentPage: page,
                totalPages: Math.ceil(totalPosts / limit),
                limit,
            },
        });
    } catch (error: any) {
        console.error(error);
        return ERROR(res, 500, error?.message, error);
    }
};

//edit
export const editPost = async (req: Request<IeditPostParamsType, {}, Ieditpost>, res: Response, next: NextFunction): Promise<any> => {
    try {
        let { desc, images } = req.body;
        const id = req.params.id;
        const post = await PostModel.findById(id)
        if (!post) {
            return ERROR(res, 404, "post not found", {});
        }
        post.desc = desc || post.desc;
        post.images = images ?? post.images;
        if (req.files && Array.isArray(req.files) && req.files.length) {
            console.log("New uploaded files:", req.files);
            const uploadedImages = req.files.map((file) => `/uploads/${file.filename}`);
            post.images = [...post.images, ...uploadedImages]; // Append new images
        }
        await post.save();
        return SUCCESS(res, 200, "Edit successfully", {});
    } catch (error: any) {
        console.log(error)
        return ERROR(res, 500, error?.message, error);
    }
};
//delete
export const deletePost = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const id = req.params.id as string;
        const post = await PostModel.findByIdAndDelete(id);
        if (!post) {
            return ERROR(res, 404, "Post not found", {});
        }
        return SUCCESS(res, 200, "Delete successfully", {});
    } catch (error: any) {
        console.log(error)
        return ERROR(res, 500, error?.message, error);
    }
};

//like dislike post
export const likeDisLikePost = async (req: Request, res: Response, next: NextFunction):
    Promise<any> => {
    try {
        const id = req.params.id as string;
        const userId = req.userId as ObjectId;
        const post = await PostModel.findById(id);
        if (!post) {
            return ERROR(res, 404, "Post not found", {});
        }
        const userLiked = post.likeCount.find((like) => like.toString() === userId.toString());
        if (userLiked) {
            post.likeCount = post.likeCount.filter((like) => like.toString() !== userId.toString());
        }
        else {
            post.likeCount.push(userId);
        }
        await post.save();
        return SUCCESS(res, 200, `${userLiked ? "Dislike" : "Like"} post successfully`, {});
    } catch (error: any) {
        console.log(error)
        return ERROR(res, 500, error?.message, error);
    }
};
