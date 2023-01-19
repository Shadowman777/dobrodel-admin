import React, { FC, useCallback, useState } from 'react'
import { Formik, FormikProps } from 'formik'
import {
  Button,
  Grid,
  FormGroup,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { toggleOpenCreatePoint } from 'store/slices/point/slice'
import { TextField } from 'components/form'
import { useAppSelector, useAppDispatch } from 'hooks/appHooks'
import { ICreateFormProps, ICreateSchema } from './types'
import { createInitialValues, createValidationSchema } from './config'
import { PointSelect } from '../../components/PointSelect'
import { createPoint } from '../../store/slices/point/thunks'
import { MapPointSelect } from '../../components/MapPointSelect'

export const CreateForm: FC = () => {
  const dispatch = useAppDispatch()
  const { open, error } = useAppSelector((state) => state.point.createModel)
  const setOpen = useCallback(
    (value) => dispatch(toggleOpenCreatePoint(value)),
    [dispatch]
  )
  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Добавить
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Добавление точки доставки</DialogTitle>
        {error && <Alert severity="error">{error}</Alert>}
        <Form handleClose={() => setOpen(false)} />
      </Dialog>
    </>
  )
}

export const Form: FC<ICreateFormProps> = ({ handleClose }) => {
  const dispatch = useAppDispatch()
  const onSubmit = useCallback(
    (values) => {
      dispatch(createPoint(values))
    },
    [dispatch]
  )
  return (
    <Formik<ICreateSchema>
      initialValues={createInitialValues}
      onSubmit={onSubmit}
      validationSchema={createValidationSchema}
    >
      {(props) => <FormikForm {...props} handleClose={handleClose} />}
    </Formik>
  )
}

const FormikForm: FC<FormikProps<ICreateSchema> & ICreateFormProps> = ({
  handleSubmit,
  setFieldValue,
  values,
  handleClose
}) => {
  const [displayMap, setDisplayMap] = useState<boolean>(false)
  return (
    <form onSubmit={handleSubmit}>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <TextField fullWidth label="Название" name="name" />
          </Grid>
          <Grid item sm={6}>
            <PointSelect
              value={values.address}
              onChange={(value) => {
                if (value) {
                  setFieldValue('address', value.address.label)
                  setFieldValue(
                    'gps_coordinates',
                    `${value.position.lat},${value.position.lng}`
                  )
                } else {
                  setFieldValue('address', '')
                  setFieldValue('gps_coordinates', '')
                }
              }}
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              fullWidth
              label="ГЕО-координаты"
              name="gps_coordinates"
            />
          </Grid>
          <Grid item sm={6}>
            <FormGroup>
              <Button
                variant="contained"
                color="primary"
                type="button"
                onClick={() => setDisplayMap(!displayMap)}
              >
                Карта
              </Button>
            </FormGroup>
          </Grid>
        </Grid>
        {displayMap && (
          <MapPointSelect
            onChange={(value) => {
              if (value) {
                setFieldValue('address', value.address.label)
                setFieldValue(
                  'gps_coordinates',
                  `${value.position.lat},${value.position.lng}`
                )
              } else {
                setFieldValue('address', '')
                setFieldValue('gps_coordinates', '')
              }
            }}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button type="button" color="primary" onClick={handleClose}>
          Отмена
        </Button>
        <Button type="submit" color="primary">
          Добавить
        </Button>
      </DialogActions>
    </form>
  )
}
