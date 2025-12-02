import { Pool, QueryResult, QueryResultRow } from 'pg';
import { ENV } from '../config/env';

const pool = new Pool({
    host: ENV.DB_HOST,
    port: Number(ENV.DB_PORT),
    user: ENV.DB_USER,
    password: ENV.DB_PASSWORD,
    database: ENV.DB_NAME,
    ssl:
        ENV.NODE_ENV === 'development'
            ? { rejectUnauthorized: false }
            : {
                rejectUnauthorized: true,
            },
});

export const DB_QUERY = async <T extends QueryResultRow = QueryResultRow>(
    queryText: string,
    params?: unknown[]
): Promise<QueryResult<T>> => {
    return pool.query<T>(queryText, params);
};
