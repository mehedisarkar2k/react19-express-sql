import { config } from 'dotenv'
import { EnvSchema } from '../schema'

config()

// Environment zod schema
const env = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
}

const ENV = EnvSchema.parse(env)

export { ENV }