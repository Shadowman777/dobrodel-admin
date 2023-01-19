import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { Formik, FormikProps } from 'formik'
import {
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Snackbar
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { createPointDate, getDates } from 'store/slices/point/thunks'
import { DataGrid, GridColDef } from '@material-ui/data-grid'
import dayjs from 'dayjs'
import { DateTimeField } from 'components/form/DateTimeField'
import { useAppSelector, useAppDispatch } from 'hooks/appHooks'
import { ICreateFormProps, IDateCreateSchema } from './types'
import { createDateInitialValues, createDateValidationSchema } from './config'
import { commonStatuses } from '../../helpers/config'
import { formatDate } from '../../utils/date'

export const DeliveryDates: FC<{ onClose: () => void; id: number }> = ({
  onClose,
  id
}) => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getDates(id))
  })
  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Даты доставки</DialogTitle>
      <Dates />
      <Form handleClose={onClose} />
    </Dialog>
  )
}

export const Form: FC<ICreateFormProps> = ({ handleClose }) => {
  const dispatch = useAppDispatch()
  const [created, setCreated] = useState<boolean>(false)
  const onSubmit = useCallback(
    (values) => {
      const valuesFormatted = {
        ...values,
        start_date: dayjs(values.start_date).format('YYYY-MM-DD hh:mm:ss'),
        end_date: dayjs(values.end_date).format('YYYY-MM-DD hh:mm:ss')
      }
      dispatch(createPointDate(valuesFormatted))
      setCreated(true)
    },
    [dispatch]
  )
  const deliveryDatePointId = useAppSelector(
    (state) => state.point.deliveryDatePointId
  )
  return (
    <>
      <Formik<IDateCreateSchema>
        initialValues={{
          ...createDateInitialValues,
          id_delivery_point: deliveryDatePointId!
        }}
        onSubmit={onSubmit}
        validationSchema={createDateValidationSchema}
      >
        {(props) => <FormikForm {...props} handleClose={handleClose} />}
      </Formik>
      <Snackbar
        open={created}
        autoHideDuration={6000}
        onClose={() => setCreated(false)}
      >
        <Alert onClose={handleClose} severity="success">
          Дата добавлена
        </Alert>
      </Snackbar>
    </>
  )
}

const FormikForm: FC<FormikProps<IDateCreateSchema> & ICreateFormProps> = ({
  handleSubmit,
  handleClose
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <DateTimeField label="Дата начала" name="start_date" />
          </Grid>
          <Grid item sm={6}>
            <DateTimeField label="Дата завершения" name="end_date" />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button type="button" onClick={handleClose}>
          Отмена
        </Button>
        <Button type="submit" color="primary">
          Добавить
        </Button>
      </DialogActions>
    </form>
  )
}

const Dates: FC = () => {
  const dates = useAppSelector((state) => state.point.dates)
  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'id',
        headerName: 'ID',
        width: 60,
        sortable: false,
        resizable: false,
        disableColumnMenu: true
      },
      {
        field: 'date_start',
        headerName: 'Дата начала',
        minWidth: 170,
        sortable: false,
        resizable: false,
        disableColumnMenu: true
      },
      {
        field: 'date_end',
        headerName: 'Дата завершения',
        minWidth: 170,
        sortable: false,
        resizable: false,
        disableColumnMenu: true
      },
      {
        field: 'status',
        headerName: 'Статус',
        minWidth: 30,
        sortable: false,
        resizable: false,
        disableColumnMenu: true,
        valueGetter: ({ value }) => commonStatuses[value as number]
      },
      {
        field: 'created_at',
        headerName: 'Создана',
        width: 140,
        sortable: false,
        resizable: false,
        disableColumnMenu: true,
        valueFormatter: ({ value }) => formatDate(value as string)
      },
      {
        field: 'updated_at',
        headerName: 'Изменена',
        width: 140,
        sortable: false,
        resizable: false,
        disableColumnMenu: true,
        valueFormatter: ({ value }) => formatDate(value as string)
      }
    ],
    []
  )

  return (
    <div style={{ height: 400 }}>
      <DataGrid columns={columns} rows={dates} hideFooter />
    </div>
  )
}
