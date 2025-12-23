import type { AnyFieldApi } from '@tanstack/react-form'
import { Eye, EyeOff } from 'lucide-react'
import { type ComponentProps, type FC, type ReactNode, useState } from 'react'
import { Field, FieldDescription, FieldLabel } from './field'
import { Input } from './input'

const FormInputField: FC<
  { field?: AnyFieldApi; label: ReactNode } & ComponentProps<'input'>
> = ({ field, label, ...props }) => {
  const [isVisible, setIsVisible] = useState(false)
  const isPassword = props.type === 'password'
  const inputType = isPassword ? (isVisible ? 'text' : 'password') : props.type

  return (
    <Field>
      <FieldLabel htmlFor={field?.name}>{label}</FieldLabel>
      <div className="relative">
        <Input
          name={field?.name}
          value={field?.state.value ?? ''}
          onBlur={field?.handleBlur}
          onChange={
            props.onChange
              ? props.onChange
              : (e) => field?.handleChange(e.target.value)
          }
          placeholder={
            props.placeholder ?? (isPassword ? '••••••••' : undefined)
          }
          {...props}
          type={inputType}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setIsVisible((prev) => !prev)}
            className="text-muted-foreground hover:text-foreground absolute right-3 top-1/2 -translate-y-1/2 outline-none cursor-pointer"
            tabIndex={-1}
          >
            {isVisible ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
            <span className="sr-only">
              {isVisible ? 'Hide password' : 'Show password'}
            </span>
          </button>
        )}
      </div>

      {field &&
        (field.state.meta.isTouched && !field.state.meta.isValid
          ? field.state.meta.errors.map((error) => (
              <FieldDescription
                key={error.message}
                className="text-destructive"
              >
                {error.message}
              </FieldDescription>
            ))
          : null)}
    </Field>
  )
}

export default FormInputField
