import Joi from 'joi';

// Define the Joi validation schema
export const socailLoginSchema = {
    body: Joi.object({
        email: Joi.string().email().optional().lowercase().messages({
            "string.base": "Email must be a string",
            "string.email": "Email must be a valid email address",
        }),
        fullName: Joi.string().optional().messages({
            "string.base": "Full name must be a string"
        }),
        profileImage: Joi.string().optional().messages({
            "string.base": "Full name must be a string"
        }),
        isEmailVerified: Joi.boolean().optional().messages({
            "boolean.base": "isEmailVerified must be a boolean"
        }),
        socialId: Joi.string().required(),
        socialType: Joi.number().optional(),
    })
};
export const loginSchema = {
    body: Joi.object({
        password: Joi.string().min(8).max(20).required().messages({
            "string.base": "Password must be a string",
            "string.min": "Password should have a minimum length of 8 characters",
            "string.max": "Password should have a maximum length of 20 characters",
            "any.required": "Password is required"
        }),
        email: Joi.string().email().required().lowercase().messages({
            "string.base": "Email must be a string",
            "string.email": "Email must be a valid email address",
            "any.required": "Email is required"
        }),
        deviceToken: Joi.string().optional().not(""),
        deviceType: Joi.number().optional().valid(1, 2, 3),
        timeZone: Joi.string().optional(),
        lat: Joi.string().optional(),
        lng: Joi.string().optional(),

    })
};
export const sendOtpSchema = {
    body: Joi.object({
        email: Joi.string().email().required().lowercase().messages({
            "string.base": "Email must be a string",
            "string.email": "Email must be a valid email address",
            "any.required": "Email is required"
        }),
        type: Joi.number().required().valid(1, 2, 3, 4),

    })
};
export const verifyOtpSchema = {
    body: Joi.object({
        email: Joi.string().email().required().lowercase().messages({
            "string.base": "Email must be a string",
            "string.email": "Email must be a valid email address",
            "any.required": "Email is required"
        }),
        otp: Joi.string().required(),

    })
};
export const resetPasswordSchema = {
    body: Joi.object({
        email: Joi.string().email().required().lowercase().messages({
            "string.base": "Email must be a string",
            "string.email": "Email must be a valid email address",
            "any.required": "Email is required"
        }),
        newPassword: Joi.string().min(8).max(20).required().messages({
            "string.base": "Password must be a string",
            "string.min": "Password should have a minimum length of 8 characters",
            "string.max": "Password should have a maximum length of 20 characters",
            "any.required": "New Password is required"
        }),

    })
};
export const getUserSchema = {
    query: Joi.object({
        id: Joi.string().hex().length(24).messages({
            'string.hex': 'PartnerId must be a hexadecimal string',
            'string.length': 'PartnerId length must be 24 characters'
        }),

    })
};
export const deleteUserSchema = {
    query: Joi.object({
        id: Joi.string().hex().length(24).messages({
            'string.hex': 'PartnerId must be a hexadecimal string',
            'string.length': 'PartnerId length must be 24 characters'
        }),

    })
};
export const updateUserDataSchema = {
    body: Joi.object({
        boi: Joi.string().optional().messages({
            "string.base": "boi must be a string",
        }),

        fullName: Joi.string().optional().messages({
            "string.base": "Full name must be a string"
        }),
    }),
};
