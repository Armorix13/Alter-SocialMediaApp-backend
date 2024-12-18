import { Document, ObjectId } from "mongoose";



  export interface UserModelType extends Document{
    fullName: string;
    email: string;
    profileImage: string;
    coverImage: string;
    boi: string;
    isEmailVerified: boolean;
    socialId: string | null;
    socialType: number;
    isDeleted: boolean;
  };
  export interface postModelType extends Document {
    desc: string;
    images: string[];
    likeCount:ObjectId[];
    isDelete: boolean;
    userId:ObjectId;
  }



