import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldGroup } from '@/components/ui/field'
import { Link, useNavigate } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'
import {
  formOptions,
  revalidateLogic,
  useForm,
  useStore,
} from '@tanstack/react-form'
import FormInputField from '@/components/ui/FormInputFiled'
import { RegisterUserSchema, type RegisterUser } from '@/types'
import {
  useCheckUsernameAvailableQuery,
  useRegisterUserMutation,
} from '@/services'
import { Check, Loader2, X } from 'lucide-react'
import { useDebounce } from 'use-debounce'
import { toast } from 'sonner'

const defaultUser: RegisterUser = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
}

const formOpts = formOptions({
  defaultValues: defaultUser,
  validationLogic: revalidateLogic(),
  validators: {
    onDynamic: RegisterUserSchema,
  },
})

export function UserRegisterForm({ className }: ComponentProps<'form'>) {
  const navigate = useNavigate()
  const { mutateAsync: registerUser } = useRegisterUserMutation()

  const form = useForm({
    ...formOpts,

    onSubmit: async ({ value }) => {
      const promise = registerUser(value)

      toast.promise(promise, {
        loading: 'Creating your account...',

        success: () => {
          form.reset()

          navigate({ to: '/login' })
          return 'Account created successfully! Please login.'
        },

        error: (err) => {
          console.error('Failed to register:', err)
          return (
            err?.response?.data?.message ||
            'Failed to create account. Please try again.'
          )
        },
      })
      try {
        await promise
      } catch (e) {
        toast.error('Failed to create account. Please try again.')
      }
    },
  })

  const username = useStore(form.store, (state) => state.values.username)
  const [debouncedUsername] = useDebounce(username, 500)

  const {
    data: available,
    isLoading,
    error,
  } = useCheckUsernameAvailableQuery(debouncedUsername)

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
                label={
                  <span
                    className={`flex items-center gap-2 ${isLoading ? 'text-muted-foreground' : ''} ${error ? 'text-destructive' : ''}`}
                  >
                    Username (Optional)
                    {isLoading && (
                      <Loader2 className="size-4 animate-spin text-muted-foreground" />
                    )}
                    {!isLoading &&
                      field.state.value &&
                      available?.success === true && (
                        <Check className="size-4 text-green-500" />
                      )}
                    {!isLoading && field.state.value && error && (
                      <X className="size-4 text-destructive" />
                    )}
                  </span>
                }
                placeholder="johndoe"
                onChange={(e) => {
                  field.handleChange(e.target.value)
                }}
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
          <Button type="submit" disabled={form.state.isSubmitting}>
            {form.state.isSubmitting ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Registering...
              </>
            ) : (
              'Register'
            )}
          </Button>
        </Field>

        <FieldDescription className="text-center">
          Already have an account? <Link to="/login">Login</Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  )
}
