import express from "express";
import { celebrate } from "celebrate";
import {
  SignupBodySchema,
  LoginBodySchema,
  UserIdSchema,
  UpdateUserSchema,
} from "../schema/user.schema.js";
import {
  saveUser,
  loginUser,
  viewProfile,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/index.js";
import { authenticate } from "../middleware/auth.middleware.js";

const userRouter = express.Router();

userRouter.post("/", celebrate({ body: SignupBodySchema }), saveUser);
userRouter.post("/login", celebrate({ body: LoginBodySchema }), loginUser);
userRouter.get("/me", authenticate, viewProfile);
userRouter.get("/", authenticate, getUsers);
userRouter.put(
  "/:id",
  authenticate,
  celebrate({ params: UserIdSchema, body: UpdateUserSchema }),
  updateUser,
);
userRouter.delete(
  "/:id",
  authenticate,
  celebrate({ params: UserIdSchema }),
  deleteUser,
);

export default userRouter;
