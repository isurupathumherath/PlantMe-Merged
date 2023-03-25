import { Joi } from "celebrate";

export const SignupBodySchema = Joi.object({
  name: Joi.string().required().min(3),
  email: Joi.string().email().required(),
  mobile: Joi.string().min(10).required(),
  password: Joi.string()
    .required()
    .pattern(
      /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/,
    ),
  role: Joi.string().valid("SUPER_ADMIN", "ADMIN", "CONSUMER"),
});

export const LoginBodySchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const UserIdSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export const UpdateUserSchema = Joi.object({
  name: Joi.string().min(3).optional(),
  email: Joi.string().email().optional(),
  mobile: Joi.string().min(10).optional(),
  password: Joi.string().optional(),
  role: Joi.string().valid("SUPER_ADMIN", "ADMIN", "CONSUMER").optional(),
});
