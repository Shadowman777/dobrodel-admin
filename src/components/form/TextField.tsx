import React, { FC } from 'react'
import {
  TextField as MTextField,
  OutlinedTextFieldProps,
  FormGroup
} from '@material-ui/core'
import { useField } from 'formik'

interface TextFieldProps extends Omit<OutlinedTextFieldProps, 'variant'> {
  name: string
  label?: string
}

export const TextField: FC<TextFieldProps> = ({ name, ...props }) => {
  const [field, meta] = useField(name)
  return (
    <FormGroup>
      <MTextField
        {...field}
        {...props}
        value={
          field.value === null || field.value === undefined ? '' : field.value
        }
        error={!!(meta.touched && meta.error)}
        helperText={meta.touched && meta.error}
        variant="outlined"
        style={{ maxWidth: '100%' }}
      />
    </FormGroup>
  )
}
