import Joi from "joi";

export const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(255).required().messages({
    "string.base": "Name must be a string",
    "string.min": "Name must be at least 3 characters",
    "string.max": "Name must not exceed 255 characters",
    "any.required": "Name is required",
  }),
});
