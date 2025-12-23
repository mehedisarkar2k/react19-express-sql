import { z } from 'zod'

export const RegisterUserSchema = z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters long'),
    lastName: z.string().optional(),
    email: z.email('Invalid email'),
    password: z
        .string()
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character',
        ),
    username: z.string().optional(),
})

export type RegisterUser = z.infer<typeof RegisterUserSchema>