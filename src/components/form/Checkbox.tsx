import React, { FC } from 'react'
import {
  Checkbox as MCheckbox,
  CheckboxProps as MCheckboxProps,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText
} from '@material-ui/core'
import { useField } from 'formik'

interface CheckboxProps extends MCheckboxProps {
  name: string
  label?: string
}

export const Checkbox: FC<CheckboxProps> = ({ name, label, ...props }) => {
  const [field, meta] = useField(name)
  return (
    <FormControl error={!!(meta.touched && meta.error)}>
      <FormGroup>
        <FormControlLabel
          control={
            <MCheckbox
              {...field}
              {...props}
              name={name}
              checked={!!field.value}
            />
          }
          label={label}
        />
        <FormHelperText>{meta.touched && meta.error}</FormHelperText>
      </FormGroup>
    </FormControl>
  )
}
