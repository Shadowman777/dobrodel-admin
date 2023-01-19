import React, { FC, useCallback } from 'react'
import { Formik, FormikProps } from 'formik'
import {
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { addProductToStock } from 'store/slices/product/thunks'
import { ProductSelect } from 'components/ProductSelect'
import { TextField } from 'components/form'
import { toggleOpenAddToStock } from 'store/slices/product/slice'
import { useAppSelector, useAppDispatch } from 'hooks/appHooks'
import { ICreateFormProps, ICreateSchema } from './types'
import { createInitialValues, createValidationSchema } from './config'

export const AddForm: FC = () => {
  const dispatch = useAppDispatch()
  const { open, error } = useAppSelector((state) => state.product.stockModel)
  const setOpen = useCallback(
    (value) => dispatch(toggleOpenAddToStock(value)),
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
        <DialogTitle>Добавление товаров на склад</DialogTitle>
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
      dispatch(addProductToStock(values))
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
  handleClose
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={9}>
            <ProductSelect<false>
              onChange={(event, product) =>
                setFieldValue('id_product', product?.id)
              }
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField label="Количество" type="number" name="count" />
          </Grid>
        </Grid>
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
  )
}
