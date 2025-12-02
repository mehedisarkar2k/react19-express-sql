import { CreateUserInput } from "./user.schema";

const createUser = async (payload: CreateUserInput) => {
    // Business logic to create a user goes here
    const newUser = {
        id: 'generated-id',
        ...payload,
    };
    return newUser;
};

export const UserService = {
    createUser,
};
