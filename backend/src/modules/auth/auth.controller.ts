import { Request, Response } from 'express';

const login = async (req: Request, res: Response) => {
    res.status(200).json({ success: true, message: 'Login route' });
};

export const AuthController = {
    login,
};
