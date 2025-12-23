import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldGroup } from '@/components/ui/field'
import { Link } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'
import { formOptions, revalidateLogic, useForm } from '@tanstack/react-form'
import z from 'zod'
import FormInputField from '@/components/ui/FormInputFiled'

const UserSchema = z.object({
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

type User = z.infer<typeof UserSchema>

const defaultUser: User = { firstName: '', email: '', password: '' }

const formOpts = formOptions({
  defaultValues: defaultUser,
  validationLogic: revalidateLogic(),
  validators: {
    onDynamic: UserSchema,
  },
})

export function UserRegisterForm({ className }: ComponentProps<'form'>) {
  const form = useForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value)
    },
  })

  return (
    <form
      className={cn('p-6 md:p-8', className)}
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <FieldGroup className="gap-4">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Register</h1>
          <p className="text-muted-foreground text-balance">
            Register to your account
          </p>
        </div>

        <form.Field
          name="firstName"
          children={(field) => {
            return (
              <FormInputField
                field={field}
                label="First Name"
                placeholder="John"
              />
            )
          }}
        />

        <form.Field
          name="lastName"
          children={(field) => {
            return (
              <FormInputField
                field={field}
                label="Last Name (Optional)"
                placeholder="Doe"
              />
            )
          }}
        />

        <form.Field
          name="email"
          children={(field) => {
            return (
              <FormInputField
                field={field}
                label="Email"
                placeholder="johndoe@example.com"
              />
            )
          }}
        />

        <form.Field
          name="username"
          children={(field) => {
            return (
              <FormInputField
                field={field}
                label="Username (Optional)"
                placeholder="johndoe"
              />
            )
          }}
        />

        <form.Field
          name="password"
          children={(field) => {
            return (
              <FormInputField field={field} label="Password" type="password" />
            )
          }}
        />

        <Field>
          <Button type="submit">Register</Button>
        </Field>

        <FieldDescription className="text-center">
          Already have an account? <Link to="/login">Login</Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  )
}
