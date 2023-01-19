import React, { FC, useCallback } from 'react'
import { Formik } from 'formik'
import {
  Button,
  MenuItem,
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent
} from '@material-ui/core'
import { toggleOpenCreatePurchase } from 'store/slices/purchase/slice'
import { createPurchase } from 'store/slices/purchase/thunks'
import { Alert } from '@material-ui/lab'
import { Select } from 'components/form'
import { DateField } from 'components/form/DateField'
import { useAppSelector, useAppDispatch } from 'hooks/appHooks'
import { ICreateFormProps, ICreateSchema } from './types'
import { buildFormData } from '../../utils/buildFormData'
import {
  createInitialValues,
  createValidationSchema,
  purchaseTypes
} from './config'

export const CreateForm: FC = () => {
  const dispatch = useAppDispatch()
  const { open, error } = useAppSelector((state) => state.purchase.createModel)
  const setOpen = useCallback(
    (value) => dispatch(toggleOpenCreatePurchase(value)),
    [dispatch]
  )
  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Создать
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Создание заявки</DialogTitle>
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
      const formData = buildFormData(new FormData(), values)
      dispatch(createPurchase(formData))
    },
    [dispatch]
  )
  return (
    <Formik<ICreateSchema>
      initialValues={createInitialValues}
      onSubmit={onSubmit}
      validationSchema={createValidationSchema}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Select name="type" label="Тип">
                  {purchaseTypes.map((option) => (
                    <MenuItem value={option.type} key={option.type}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={6}>
                <DateField label="Дата от" name="date_start" />
              </Grid>
              <Grid item xs={6}>
                <DateField label="Дата до" name="date_end" />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button type="button" color="primary" onClick={handleClose}>
              Отмена
            </Button>
            <Button color="primary" type="submit">
              Создать
            </Button>
          </DialogActions>
        </form>
      )}
    </Formik>
  )
}
