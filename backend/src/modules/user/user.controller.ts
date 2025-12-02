import { Request, Response } from 'express';
import { UserZodSchema } from './user.schema';
import { UserService } from './user.service';
import { SendResponse } from '../../core';

const createUser = async (req: Request, res: Response) => {
    const body = UserZodSchema.CreateUserSchema.parse(req.body);

    const newUser = await UserService.createUser(body);

    return SendResponse.created({
        res,
        message: 'User created successfully',
        data: newUser,
    });
};

export const UserController = {
    createUser,
};
