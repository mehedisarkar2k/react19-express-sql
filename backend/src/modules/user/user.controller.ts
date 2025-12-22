import { Request, Response } from 'express';
import { UserZodSchema } from './user.schema';
import { UserService } from './user.service';
import { Password, SendResponse } from '../../core';

const createUser = async (req: Request, res: Response) => {
    const { password, ...rest } = UserZodSchema.CreateUserSchema.parse(req.body);

    const hashedPassword = await Password.hash(password);

    const payload = {
        ...rest,
        password: hashedPassword,
    };

    const newUser = await UserService.createUser(payload);

    if (!newUser || !newUser.rowCount) {
        return SendResponse.internalServerError({
            res,
            message: 'Failed to create user',
        });
    }

    return SendResponse.created({
        res,
        message: 'User created successfully',
        data: newUser.rows[0],
    });
};

const checkUsernameAvailable = async (req: Request, res: Response) => {
    const { username } = UserZodSchema.CheckUsernameSchema.parse(req.query);

    const user = await UserService.findUserByUsername(username);

    if (user) {
        return SendResponse.badRequest({
            res,
            message: 'Username already exists',
        });
    }

    return SendResponse.success({
        res,
        message: 'Username available',
    });
};

export const UserController = {
    createUser,
    checkUsernameAvailable,
};
