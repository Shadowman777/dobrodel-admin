import React, { FC } from 'react'
import { FormGroup } from '@material-ui/core'
import { useField } from 'formik'
import { DatePicker, DatePickerViewsProps } from '@material-ui/pickers'
import dayjs from 'dayjs'

interface DateFieldProps extends Omit<DatePickerViewsProps, 'variant'> {
  name: string
  label: string
  handleChange?: (date: string) => void
}

export const DateField: FC<DateFieldProps> = ({
  name,
  handleChange,
  ...props
}) => {
  const [field, meta, { setValue }] = useField(name)
  return (
    <FormGroup>
      <DatePicker
        {...field}
        {...props}
        autoOk
        inputVariant="outlined"
        format="DD.MM.YYYY"
        error={!!(meta.touched && meta.error)}
        helperText={meta.touched && meta.error}
        style={{ maxWidth: '100%' }}
        value={
          field.value === null || field.value === undefined ? '' : field.value
        }
        onChange={(date) => {
          const value = dayjs(date).format('YYYY-MM-DD')
          setValue(value)
          if (handleChange) handleChange(value)
        }}
      />
    </FormGroup>
  )
}
