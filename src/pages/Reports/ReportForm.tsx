import React, { FC, useCallback, useEffect, useState } from 'react'
import { Formik, FormikProps } from 'formik'
import {
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  MenuItem,
  ListItemText,
  ListItem
} from '@material-ui/core'
import * as Yup from 'yup'
import qs from 'qs'
import { Select } from 'components/form'
import { useAppSelector, useAppDispatch } from 'hooks/appHooks'
import {
  ICreateFormProps,
  ICreateReportSchema,
  IReportFormProps
} from './types'
import { getDates, getPoints } from '../../store/slices/point/thunks'
import { formatDate } from '../../utils/date'

export const ReportForm: FC<IReportFormProps> = ({ name, url }) => {
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
    (values) => {
      window.open(`${url}?${qs.stringify(values)}`, '_blank')
    },
    [dispatch]
  )
  const createInitialValues = {
    id_delivery_point: undefined,
    id_delivery_date: undefined
  }

  const validationSchema = Yup.object({
    id_delivery_point: Yup.number().required(),
    id_delivery_date: Yup.number().required()
  })
  return (
    <>
      <Formik<ICreateReportSchema>
        initialValues={createInitialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(props) => <FormikForm {...props} handleClose={handleClose} />}
      </Formik>
    </>
  )
}

const FormikForm: FC<FormikProps<ICreateReportSchema> & ICreateFormProps> = ({
  handleSubmit,
  handleChange,
  setFieldValue,
  handleClose,
  values
}) => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getPoints())
  }, [])
  const points = useAppSelector((state) => state.point.items)
  const dates = useAppSelector((state) => state.point.dates)

  return (
    <form onSubmit={handleSubmit}>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={6}>
            <Select
              label="Точка доставки"
              name="id_delivery_point"
              onChange={(e) => {
                handleChange(e)
                setFieldValue('id_delivery_date', undefined)
                dispatch(getDates(e.target.value as number))
              }}
            >
              {points.map((item) => (
                <MenuItem value={item.id} key={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Select
              label="Дата доставки"
              name="id_delivery_date"
              disabled={!values.id_delivery_point}
            >
              {dates.map((item) => (
                <MenuItem value={item.id} key={item.id}>
                  {formatDate(item.date_start)} {' - '}
                  {formatDate(item.date_end)}
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
