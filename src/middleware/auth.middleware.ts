import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/helpers";
import { ERROR } from "../utils/response";
import { ObjectId } from "mongoose";
import UserModel from "../models/user.model";

// Extend Express Request
declare global {
  namespace Express {
    interface Request {
      userId?: ObjectId | string;
      user?: any | null;
    }
  }
}

// Authentication Middleware
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.headers.authorization) {
      ERROR(res, 401, "Unauthorized", {});
      return;
    }

    const token = req.headers.authorization.split(" ")[1];
    // Verify token
    const decoded = await verifyToken(token);
      if (!decoded) {
      ERROR(res, 401, "Unauthorized", {});
      return;
    }

    // Find user
    const user = await UserModel.findById(decoded.id);
    if (!user) {
      ERROR(res, 401, "Unauthorized", {});
      return;
    }
    console.log("User",user);
    req.user = user;
    req.userId = user.id;

    next(); 
  } catch (err) {
    ERROR(res, 401, "Unauthorized", {});
    return;
  }
};
