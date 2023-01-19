import React, { FC, useCallback, useState } from 'react'
import { Formik, FormikProps } from 'formik'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent
} from '@material-ui/core'
import { TextField } from 'components/form'
import * as Yup from 'yup'

import { useAppDispatch } from 'hooks/appHooks'

export interface IFormProps {
  handleClose: () => void
}

export interface IFormSchema {
  amount: number
}

const initialValues: IFormSchema = {
  amount: 0
}

export const validationSchema = Yup.object({
  amount: Yup.number().required()
})

export const GivePromocode: FC = () => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Выдать промокод за заказ
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs">
        <DialogTitle>Выдача промокода</DialogTitle>
        {/* {error && <Alert severity="error">{error}</Alert>} */}
        <Form handleClose={() => setOpen(false)} />
      </Dialog>
    </>
  )
}

export const Form: FC<IFormProps> = ({ handleClose }) => {
  const dispatch = useAppDispatch()
  const handleSubmit = useCallback(
    (values) => {
      // const formData = buildFormData(new FormData(), values)
    },
    [dispatch]
  )
  return (
    <Formik<IFormSchema>
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {(props) => <FormikForm {...props} handleClose={handleClose} />}
    </Formik>
  )
}

const FormikForm: FC<FormikProps<IFormSchema> & IFormProps> = ({
  handleSubmit,
  handleClose
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <DialogContent>
        <TextField fullWidth label="Сумма" name="title" />
      </DialogContent>
      <DialogActions>
        <Button type="button" color="primary" onClick={handleClose}>
          Отмена
        </Button>
        <Button color="primary" type="submit" disabled>
          Отправить
        </Button>
      </DialogActions>
    </form>
  )
}
