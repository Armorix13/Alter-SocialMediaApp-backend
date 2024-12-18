import Joi from "joi";

export const CreatePostSchema = {
    body: Joi.object({
        desc: Joi.string().optional().messages({
            "string.base": "Phone must be a string"
        }),
    })
};
export const updatePostSchema = {
    params:Joi.object({
        id: Joi.string().hex().length(24).required().messages({
            'string.hex': 'PartnerId must be a hexadecimal string',
            'string.length': 'PartnerId length must be 24 characters',
            "any.required": "Id is required in params"
        }),
    }),
    body: Joi.object({
        desc: Joi.string().optional().messages({
            "string.base": "desc must be a string"
        }),
    })
};
export const deletePostSchema = {
    params:Joi.object({
        id: Joi.string().hex().length(24).required().messages({
            'string.hex': 'post Id must be a hexadecimal string',
            'string.length': 'Post Id length must be 24 characters',
            "any.required": "Id is required in params"
        }),
    }),
};