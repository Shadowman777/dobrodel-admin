import React, { useCallback, useState } from 'react'
import { Formik } from 'formik'
import { Button, Chip, Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import * as Yup from 'yup'
import { useAppDispatch, useAppSelector } from 'hooks/appHooks'
import { PurchaseProduct } from 'types/purchases'
import { updateStatusItem } from 'store/slices/purchase/thunks'
import {
  StyledField,
  StyledProduct,
  StyledProductActions,
  StyledProductColumn,
  StyledProductRow
} from './styled'

interface ProductProps {
  product: PurchaseProduct
}

interface FormSchema {
  quantity?: number
  name: string
}

export const productValidationSchema = Yup.object({
  quantity: Yup.number().required(),
  name: Yup.string()
})

const Product: React.FC<ProductProps> = ({ product }) => {
  const purchaseOrder = useAppSelector((state) => state.purchase.order)
  const [error, setError] = useState<any>(null)
  const dispatch = useAppDispatch()
  const [updateField, setUpdateField] = useState<string>('')

  const onSubmit = useCallback(
    async (values) => {
      let additional = {}
      if (updateField === 'quantity') {
        additional = {
          quantity: values.quantity,
          status: values.quantity >= product!.quantity_original! ? 1 : 0
        }
      } else if (updateField === 'name') {
        additional = {
          name: values.name,
          status: 2
        }
      }
      const result = await dispatch(
        updateStatusItem({
          id_item: product.id_product,
          id_order: purchaseOrder.data!.id_order,
          id_purchase: purchaseOrder.data!.id_purchase,
          status: 0,
          ...additional
        })
      )
      if (updateStatusItem.rejected.match(result)) {
        return setError(result.error.message)
      } else {
        return setUpdateField('')
      }
    },
    [dispatch]
  )
  const handleCancelOrder = async () => {
    const result = await dispatch(
      updateStatusItem({
        id_item: product.id_product,
        id_order: purchaseOrder.data!.id_order,
        id_purchase: purchaseOrder.data!.id_purchase,
        status: 5
      })
    )
    if (updateStatusItem.rejected.match(result)) {
      setError(result.error.message)
    }
  }
  return (
    <StyledProduct variant="outlined">
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
      >
        <Alert onClose={() => setError(null)} severity="error">
          {error}
        </Alert>
      </Snackbar>
      <StyledProductColumn>
        <div>Наше название: {product.product_name}</div>
        <div>Название поставщика: {product.product_name_supplier}</div>
      </StyledProductColumn>
      <StyledProductColumn>
        <StyledProductRow>
          <Chip
            label={`${product.quantity} / ${product.quantity_original}`}
            title="Количество"
          />
          <Button
            color="primary"
            variant="contained"
            size="small"
            onClick={() => setUpdateField('quantity')}
          >
            Изменить количество
          </Button>
          <Button
            color="primary"
            variant="contained"
            size="small"
            onClick={() => setUpdateField('name')}
          >
            Заменить
          </Button>
          <Button
            color="primary"
            variant="contained"
            size="small"
            onClick={handleCancelOrder}
          >
            Отменить
          </Button>
        </StyledProductRow>
        {updateField ? (
          <Formik<FormSchema>
            initialValues={{ quantity: product?.quantity, name: '' }}
            validationSchema={productValidationSchema}
            onSubmit={onSubmit}
          >
            {({ handleSubmit }) => (
              <StyledProductActions onSubmit={handleSubmit}>
                <Button
                  color="primary"
                  variant="outlined"
                  type="submit"
                  size="small"
                >
                  Сохранить
                </Button>
                {updateField === 'quantity' && (
                  <StyledField label="Количество" name="quantity" />
                )}
                {updateField === 'name' && (
                  <StyledField
                    label="Название товара, на который будет производиться замена"
                    name="name"
                  />
                )}
              </StyledProductActions>
            )}
          </Formik>
        ) : (
          ''
        )}
      </StyledProductColumn>
    </StyledProduct>
  )
}

export default Product
