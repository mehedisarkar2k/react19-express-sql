import { DB_QUERY } from "../../core";
import { CreateUserInput } from "./user.schema";

const createUser = async (payload: CreateUserInput) => {


    const queryText = 'INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4)';
    const queryParams = ['payload.id', `${payload.firstName} ${payload.lastName || ''}`.trim(), payload.email, payload.password];

    return await DB_QUERY(queryText, queryParams);


};

export const UserService = {
    createUser,
};
