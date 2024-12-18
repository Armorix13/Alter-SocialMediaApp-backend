import argon2 from "argon2";
import JWT from "jsonwebtoken";
import UserModel from "../models/user.model";


export function generateToken(id: string | any ): string {
    const token = JWT.sign(
        { id},
        process.env.JWT_SECRET_KEY as string ||"abcdefghijklmnopqrstuvwxyz",
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "7d" // Use as an option here
        }
    );
    return token;
};
//verify token
export async function verifyToken(token: string,): Promise<any> {
    try {
        const decoded = await JWT.verify(token, process.env.JWT_SECRET_KEY as string ||"abcdefghijklmnopqrstuvwxyz");
        return decoded;
    } catch (error) {
        console.error("Token verification error:", error);
        throw error;
    }
}

