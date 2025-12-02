import { Router } from "express";
import { UserController } from "./user.controller";
import { asyncHandler } from "../../core";

const userRouter = Router();

userRouter.post('/', asyncHandler(UserController.createUser));

export { userRouter as UserRouter };