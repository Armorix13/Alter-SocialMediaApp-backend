import { NextFunction, Request, Response } from "express";
import { generateToken, } from "../utils/helpers";
import { ERROR, SUCCESS } from "../utils/response";
import UserModel from "../models/user.model";
import { IRegisterUser,IUpdateUserData} from "../types/Request Body/User/types";
import { IdeleteAccountQueryType, IgetProfileQueryType } from "../types/Request Query/User/types";

export const socail_login = async (req: Request<{},{},IRegisterUser>, res: Response, next: NextFunction): Promise<any> => {
    try {
        let {fullName, email, socialType, socialId } = req.body;
        console.log("req.body", req.body)
        let userExists = await UserModel.findOne({socialId});
        if (!userExists) {
            userExists = await UserModel.create({
                fullName, email,socialType,socialId
            })
        }
        // await sendEmail(email,1,otp)
        const token = generateToken(userExists._id )
        return SUCCESS(res, 200, "Login suceesfully", { userExists, token });
    } catch (error: any) {
        console.log(error)
        return ERROR(res, 500, "Internal Server Error", error);
    }
}


//getProfile
export const getProfile = async (req: Request<{},{},{},IgetProfileQueryType>, res: Response, next: NextFunction):Promise<any>=>{
    try {
        let userExists = req.user;
        const id = req.query.id;
        if(id){
            userExists = await UserModel.findById(id);

        }
        return SUCCESS(res, 200, "Data fetch successfully", { userExists });
    } catch (error: any) {
        return ERROR(res, 500, "Internal Server Error", error);
    }
    
}
//delete account

export const deleteAccount = async (req: Request<{},{},{},IdeleteAccountQueryType>, res: Response, next: NextFunction): Promise<any>=>{
    try {
        let id = req.query.id || req.userId;
        const type = req.query.type ;
        const userExits = await UserModel.findById(id);
        if (!userExits) {
            return ERROR(res, 400, "User not found", {});
            }
        if(type == 1){
            userExits.isDeleted=true;
            await userExits.save();
        }else{
            await UserModel.findByIdAndDelete(id);
        
    }
        return SUCCESS(res, 200, "User account deleted successfully");
    } catch (error: any) {
        return ERROR(res, 500, "Internal Server Error", error);
    }
};
//update usre data
export const updateUserData = async (req: Request<{},{},IUpdateUserData>, res: Response, next: NextFunction):Promise<any> => {
    try {
        const id = req.userId;
        let userExists = await UserModel.findById(id);
        if (!userExists) {
            return ERROR(res, 400, "User not found", {});
        }
        let {boi,fullName,} = req.body;
      
        userExists.boi = boi || userExists.boi;
        userExists.fullName = fullName || userExists.fullName;
        console.log("req.file",req.file)
        if (req.files) {
            const files = req.files as { [fieldname: string]: Express.Multer.File[] };

            // Update profileImage if uploaded
            if (files['profileImage'] && files['profileImage'][0]) {
                userExists.profileImage = `/uploads/${files['profileImage'][0].filename}`;
            }

            // Update coverImage if uploaded
            if (files['coverImage'] && files['coverImage'][0]) {
                userExists.coverImage = `/uploads/${files['coverImage'][0].filename}`;
            }
        }
        await userExists.save();
        return SUCCESS(res, 200, "User data updated successfully", { userExists });
    } catch (error: any) {
        return ERROR(res, 500, "Internal Server Error", error);
    }
};
//logout
export const logout = async (req: Request, res: Response, next: NextFunction): Promise<any>=>{
    try {
        const id = req.userId;
        const user = await UserModel.findById(id);
        if (!user) {
            return ERROR(res, 400, "User not found", {});
        }
        return SUCCESS(res, 200, "User logged out successfully", {});
        
    } catch (error:any) {
        next(error);
        
    }

}

