import Joi from "joi";

export const createUserSchema = Joi.object({
  name: Joi.string().min(3).max(255).required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters",
    "string.max": "Name must not exceed 255 characters",
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string",
    "string.empty": "Email is required",
    "string.email": "Email must be valid",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.base": "Password must be a string",
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
    "any.required": "Password is required",
  }),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(255).optional().messages({
    "string.base": "Name must be a string",
    "string.min": "Name must be at least 3 characters",
    "string.max": "Name must not exceed 255 characters",
  }),
  email: Joi.string().email().optional().messages({
    "string.base": "Email must be a string",
    "string.email": "Email must be valid",
  }),
  password: Joi.string().min(6).optional().messages({
    "string.base": "Password must be a string",
    "string.min": "Password must be at least 6 characters",
  }),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided",
  });
