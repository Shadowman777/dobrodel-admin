import React, { FC, useCallback, useState } from 'react'
import { Formik, FormikProps } from 'formik'
import {
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  ListItemText,
  ListItem
} from '@material-ui/core'
import * as Yup from 'yup'
import qs from 'qs'
import dayjs from 'dayjs'
import { DateField } from 'components/form/DateField'
import { useAppDispatch } from 'hooks/appHooks'
import {
  ICreateFormProps,
  ICreateListProductsPurchaseSchema,
  IReportFormProps
} from './types'

export const ByDateReportForm: FC<IReportFormProps> = ({ name, url }) => {
  const [open, setOpen] = useState<boolean>(false)
  const onClose = () => setOpen(false)
  return (
    <>
      <ListItem button onClick={() => setOpen(true)}>
        <ListItemText primary={name} />
      </ListItem>
      {open && (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
          <DialogTitle>{name}</DialogTitle>
          <Form handleClose={onClose} url={url} />
        </Dialog>
      )}
    </>
  )
}

export const Form: FC<ICreateFormProps> = ({ handleClose, url }) => {
  const dispatch = useAppDispatch()
  const onSubmit = useCallback(
    async (values) => {
      const valuesFormatted = {
        date: dayjs(values.date).format('YYYY-MM-DD')
      }
      window.open(`${url}?${qs.stringify(valuesFormatted)}`, '_blank')
    },
    [dispatch, url]
  )
  const createInitialValues = {
    date: ''
  }

  const validationSchema = Yup.object({
    date: Yup.string().required()
  })
  return (
    <>
      <Formik<ICreateListProductsPurchaseSchema>
        initialValues={createInitialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(props) => <FormikForm {...props} handleClose={handleClose} />}
      </Formik>
    </>
  )
}

const FormikForm: FC<
  FormikProps<ICreateListProductsPurchaseSchema> & ICreateFormProps
> = ({ handleSubmit, handleClose }) => {
  return (
    <form onSubmit={handleSubmit}>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <DateField label="Дата" name="date" />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button type="button" onClick={handleClose}>
          Отмена
        </Button>
        <Button type="submit" color="primary">
          Сформировать
        </Button>
      </DialogActions>
    </form>
  )
}
