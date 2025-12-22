import { Router } from 'express';
import { UserController } from './user.controller';
import { asyncHandler } from '../../core';
import { requestValidator } from '../../middleware';
import { UserZodSchema } from './user.schema';

const userRouter = Router();

userRouter.post(
    '/',
    requestValidator(UserZodSchema.CreateUserSchema),
    asyncHandler(UserController.createUser)
);

// check userName available
userRouter.get(
    '/check-username',
    requestValidator(UserZodSchema.CheckUsernameSchema),
    asyncHandler(UserController.checkUsernameAvailable)
);

export default userRouter;
