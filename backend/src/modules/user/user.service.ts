import { DB_QUERY } from '../../core';
import { CreateUserInput } from './user.schema';

const createUser = async (payload: CreateUserInput) => {
    const queryText =
        'INSERT INTO users (firstName, lastName, email, password) VALUES ($1, $2, $3, $4) RETURNING id, firstName, lastName, email, role, created_at';
    const queryParams = [
        payload.firstName,
        payload.lastName || null,
        payload.email,
        payload.password,
    ];

    return await DB_QUERY(queryText, queryParams);
};

export const UserService = {
    createUser,
};
