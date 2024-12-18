
import { Response, NextFunction, Request } from "express";
import Joi from "joi";
import { ERROR } from "../utils/response";

export const validate = (schema: Record<string, Joi.Schema>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const validationResults = Object.entries(schema).map(([key, joiSchema]) => {
      const { error } = joiSchema.validate(req[key as keyof Request], { abortEarly: false, allowUnknown: false });
      return error ? { key, details: error.details } : null;
    });

    const errors = validationResults.filter((result) => result !== null) as Array<{ key: string; details: Joi.ValidationErrorItem[] }>;

    if (errors.length > 0) {
      const errorMessages = errors.flatMap((err) => err.details.map((detail) => detail.message.replace(/"/g, '')));
      ERROR(res, 400, errors[0].details[0].message, { errors: errorMessages });
      return;
    }

    next();
  };
};
