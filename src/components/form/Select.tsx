import React, { FC } from 'react'
import {
  InputLabel,
  Select as MSelect,
  FormHelperText,
  FormControl,
  SelectProps as MSelectProps
} from '@material-ui/core'
import { useField } from 'formik'

interface ISelectProps extends MSelectProps {
  name: string
  label: string
}

export const Select: FC<ISelectProps> = ({
  name,
  children,
  label,
  ...props
}) => {
  const [field, meta] = useField(name)
  return (
    <FormControl
      variant="outlined"
      error={!!(meta.touched && meta.error)}
      fullWidth
    >
      <InputLabel id={name}>{label}</InputLabel>
      <MSelect labelId={name} {...field} {...props}>
        {children}
      </MSelect>
      <FormHelperText>{meta.touched && meta.error}</FormHelperText>
    </FormControl>
  )
}
