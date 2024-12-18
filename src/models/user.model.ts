import mongoose from "mongoose";
import { decivesTypeEnums, rolesEnums, genderEnums, socialTypeEnums } from "../utils/enums";
import { UserModelType } from "../types/Database/types";

const usersSchema = new mongoose.Schema<UserModelType>(
    {
        fullName: {
            type: String,
            default: "",
        },
        email: {
            type: String,
        },
        profileImage: {
            type: String,
            default: ""
        },
        coverImage: {
            type: String,
            default: ""
        },
        boi: {
            type: String,
            default: ""
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
        socialId: {
            type: String,
            default: null
        },
        socialType: {
            type: Number,
            enum: Object.values(socialTypeEnums),// 1 google 
            default: null
        },
        isDeleted: {
            type: Boolean,
            default: false,
        }
    },
    { timestamps: true }
);
usersSchema.index({ location: "2dsphere" });

const UserModel = mongoose.model("users", usersSchema);

export default UserModel;
