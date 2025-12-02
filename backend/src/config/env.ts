import { config } from 'dotenv'
import { EnvSchema } from '../schema'

config()

// Environment zod schema
const env = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    PG_CONNECTION_STRING: process.env.PG_CONNECTION_STRING,
}

const ENV = EnvSchema.parse(env)

export { ENV }