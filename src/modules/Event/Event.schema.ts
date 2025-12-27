import Joi from "joi";

export const createEventSchema = Joi.object({
  title: Joi.string().min(3).max(255).required().messages({
    "string.base": "Title must be a string",
    "string.empty": "Title is required",
    "string.min": "Title must be at least 3 characters",
    "string.max": "Title must not exceed 255 characters",
    "any.required": "Title is required",
  }),
  description: Joi.string().required().messages({
    "string.base": "Description must be a string",
    "string.empty": "Description is required",
    "any.required": "Description is required",
  }),
  themeColor: Joi.string()
    .valid("blue", "red", "green", "yellow", "purple", "pink", "orange", "teal")
    .required()
    .messages({
      "string.base": "Theme color must be a string",
      "string.empty": "Theme color is required",
      "any.only":
        "Theme color must be one of: blue, red, green, yellow, purple, pink, orange, teal",
      "any.required": "Theme color is required",
    }),
  date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .required()
    .messages({
      "string.base": "Date must be a string",
      "string.empty": "Date is required",
      "string.pattern.base": "Date must be in format YYYY-MM-DD",
      "any.required": "Date is required",
    }),
  hour: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .required()
    .messages({
      "string.base": "Hour must be a string",
      "string.empty": "Hour is required",
      "string.pattern.base": "Hour must be in format HH:MM (24h)",
      "any.required": "Hour is required",
    }),
});

export const updateEventSchema = Joi.object({
  title: Joi.string().min(3).max(255).optional().messages({
    "string.base": "Title must be a string",
    "string.min": "Title must be at least 3 characters",
    "string.max": "Title must not exceed 255 characters",
  }),
  description: Joi.string().optional().messages({
    "string.base": "Description must be a string",
  }),
  themeColor: Joi.string()
    .valid("blue", "red", "green", "yellow", "purple", "pink", "orange", "teal")
    .optional()
    .messages({
      "string.base": "Theme color must be a string",
      "any.only":
        "Theme color must be one of: blue, red, green, yellow, purple, pink, orange, teal",
    }),
  date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .optional()
    .messages({
      "string.base": "Date must be a string",
      "string.pattern.base": "Date must be in format YYYY-MM-DD",
    }),
  hour: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .optional()
    .messages({
      "string.base": "Hour must be a string",
      "string.pattern.base": "Hour must be in format HH:MM (24h)",
    }),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided",
  });
