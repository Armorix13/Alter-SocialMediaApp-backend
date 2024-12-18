import mongoose from "mongoose";
import {  postModelType } from "../types/Database/types";

const PostSchema = new mongoose.Schema<postModelType>(
    {
        desc: {
            type: String,
            default: "",
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        },
        images: [{
            type: String,
        }],
        likeCount:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        }],
        isDelete: {
            type: Boolean,
            default: false,
        },
        
    },
    { timestamps: true }
);




const PostModel = mongoose.model("posts", PostSchema);

export default PostModel;
