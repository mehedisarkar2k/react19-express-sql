import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Link } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

export function UserRegisterForm({
  className,
  ...props
}: ComponentProps<'form'>) {
  return (
    <form className={cn('p-6 md:p-8', className)} {...props}>
      <FieldGroup className="gap-4">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Register</h1>
          <p className="text-muted-foreground text-balance">
            Register to your account
          </p>
        </div>

        <Field>
          <FieldLabel htmlFor="firstName">First Name</FieldLabel>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="John"
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="lastName">Last Name (Optional)</FieldLabel>
          <Input id="lastName" name="lastName" type="text" placeholder="Doe" />
        </Field>

        <Field>
          <FieldLabel htmlFor="username">Username (Optional)</FieldLabel>
          <Input
            id="username"
            name="username"
            type="text"
            placeholder="johndoe"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </Field>

        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
          </div>
          <Input id="password" name="password" type="password" required />
        </Field>

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
