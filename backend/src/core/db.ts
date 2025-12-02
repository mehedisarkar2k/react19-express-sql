import { Pool, QueryResult, QueryResultRow } from 'pg';
import { ENV } from '../config/env';

const pool = new Pool({
    host: ENV.DB_HOST,
    port: Number(ENV.DB_PORT),
    user: ENV.DB_USER,
    password: ENV.DB_PASSWORD,
    database: ENV.DB_NAME,
    options: '--search_path=public',
    ssl: {
        rejectUnauthorized: ENV.NODE_ENV !== 'development',
    },
});

export const DB_QUERY = async <T extends QueryResultRow = QueryResultRow>(
    queryText: string,
    params?: unknown[]
): Promise<QueryResult<T>> => {
    return pool.query<T>(queryText, params);
};

export const initDB = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        firstName VARCHAR(100) NOT NULL,
        lastName VARCHAR(100),
        role VARCHAR(50) DEFAULT 'user',
        email VARCHAR(150) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        age INT,
        phone VARCHAR(15),
        address TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )
        `);
};
