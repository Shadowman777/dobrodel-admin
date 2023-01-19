import React, { FC } from 'react'
import { FormGroup } from '@material-ui/core'
import { useField } from 'formik'
import { DateTimePicker, DateTimePickerViewsProps } from '@material-ui/pickers'
import dayjs from 'dayjs'

interface DateTimeFieldProps extends Omit<DateTimePickerViewsProps, 'variant'> {
  name: string
  label: string
}

export const DateTimeField: FC<DateTimeFieldProps> = ({ name, ...props }) => {
  const [field, meta, { setValue }] = useField(name)
  return (
    <FormGroup>
      <DateTimePicker
        {...field}
        {...props}
        autoOk
        ampm={false}
        inputVariant="outlined"
        format="DD.MM.YYYY HH:mm"
        error={!!(meta.touched && meta.error)}
        helperText={meta.touched && meta.error}
        style={{ maxWidth: '100%' }}
        value={field.value}
        onChange={(date) => setValue(dayjs(date).format('YYYY-MM-DD HH:mm'))}
      />
    </FormGroup>
  )
}
