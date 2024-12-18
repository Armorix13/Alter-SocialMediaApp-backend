import { Response } from "express";
type ResponseData = Record<string, any>;

export const SUCCESS = (
  res: Response,
  status: number,
  message: string,
  data?: ResponseData
): ResponseData => {
  return res.status(status).json({
    success: true,
    message,
    ...(data ? data : {})
  });
};

export const ERROR = (
  res: Response,
  status: number,
  message: string,
  error: ResponseData | null = null
): ResponseData => {
  return res.status(status).json({
    success: false,
    message,
    ...error
  });
};
