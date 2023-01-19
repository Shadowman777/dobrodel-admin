import React, { FC, useCallback, useEffect, useState } from 'react'
import { Formik, FormikProps } from 'formik'
import {
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  ListItemText,
  ListItem,
  MenuItem
} from '@material-ui/core'
import * as Yup from 'yup'
import qs from 'qs'
import dayjs from 'dayjs'
import { Select } from 'components/form'
import { DateField } from 'components/form/DateField'
import { getAllDates, getDate } from 'store/slices/point/thunks'
import { useAppSelector, useAppDispatch } from 'hooks/appHooks'
import {
  ICreateFormProps,
  ICreateListProductsPurchaseSchema,
  IReportFormProps
} from './types'

export const ListProductsPurchaseFormNew: FC<IReportFormProps> = ({
  name,
  url
}) => {
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
  const dispatch = useAppDispatch()
  const points = useAppSelector((state) => state.point.items)
  useEffect(() => {
    dispatch(getAllDates())
  }, [])

  return (
    <form onSubmit={handleSubmit}>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <DateField
              label="Дата доставки"
              name="date"
              handleChange={(date) => {
                dispatch(getDate(date))
              }}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <Select label="Точка доставки" name="id_delivery_point">
              {points.map((item) => (
                <MenuItem value={item.id} key={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
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
