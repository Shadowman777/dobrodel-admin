import React, { FC, useCallback } from 'react'
import { Formik } from 'formik'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core'
import { toggleOpenCreateUnit } from 'store/slices/unit/slice'
import { Alert } from '@material-ui/lab'
import { TextField } from 'components/form'
import { useAppSelector, useAppDispatch } from 'hooks/appHooks'
import { createUnit } from 'store/slices/unit/thunks'
import { ICreateFormProps, ICreateSchema } from './types'

import { createInitialValues, createValidationSchema } from './config'

export const CreateForm: FC = () => {
  const dispatch = useAppDispatch()
  const { open, error } = useAppSelector((state) => state.unit.createModel)
  const setOpen = useCallback(
    (value) => dispatch(toggleOpenCreateUnit(value)),
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
        maxWidth="sm"
      >
        <DialogTitle>Добавление единицы измерения</DialogTitle>
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
      dispatch(createUnit(values))
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
            <TextField fullWidth label="Единица измерения" name="name" />
          </DialogContent>
          <DialogActions>
            <Button type="button" color="primary" onClick={handleClose}>
              Отмена
            </Button>
            <Button color="primary" type="submit">
              Добавить
            </Button>
          </DialogActions>
        </form>
      )}
    </Formik>
  )
}
