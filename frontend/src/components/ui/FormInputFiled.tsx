import type { AnyFieldApi } from '@tanstack/react-form'
import type { ComponentProps, FC } from 'react'
import { Field, FieldDescription, FieldLabel } from './field'
import { Input } from './input'

const FormInputField: FC<
  { field?: AnyFieldApi; label: string } & ComponentProps<'input'>
> = ({ field, ...props }) => {
  return (
    <Field>
      <FieldLabel htmlFor={field?.name}>{props.label}</FieldLabel>
      <Input
        name={field?.name}
        value={field?.state.value}
        onBlur={field?.handleBlur}
        onChange={(e) => field?.handleChange(e.target.value)}
        placeholder={
          props.placeholder ??
          (props.type === 'password' ? '••••••••' : undefined)
        }
        {...props}
      />

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
