import React, { useCallback, useState } from 'react'
import { Formik } from 'formik'
import { Button, Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { savePurchasedQuantity } from 'store/slices/purchase/thunks'
import { useAppDispatch, useAppSelector } from 'hooks/appHooks'
import { PurchaseProduct } from 'types/purchases'
import {
  StyledProductNames,
  StyledProduct,
  StyledProductActions,
  StyledQuantityField
} from './styled'
import { productValidationSchema } from '../config'

interface ProductProps {
  product: PurchaseProduct
}

interface FormSchema {
  quantity?: number
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const purchaseDetail = useAppSelector((state) => state.purchase.detail)
  const [error, setError] = useState<any>(null)
  const dispatch = useAppDispatch()
  const status =
    product.quantity === product.purchase_quantity
      ? 0
      : product.quantity
      ? 1
      : 2
  const onSubmit = useCallback(
    async (values) => {
      const result = await dispatch(
        savePurchasedQuantity({
          id_product: product.id_product,
          id_purchase: purchaseDetail!.data!.id_purchase!,
          quantity: values.quantity
        })
      )

      if (savePurchasedQuantity.rejected.match(result)) {
        setError(result.error.message)
      }
    },
    [dispatch]
  )
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
      <StyledProductNames>
        <div>Наше название: {product.product_name}</div>
        <div>Название поставщика: {product.product_name_supplier}</div>
      </StyledProductNames>

      <Formik<FormSchema>
        initialValues={{ quantity: product?.purchased_quantity }}
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
            <StyledQuantityField placeholder="Количество" name="quantity" />
            из {product.purchase_quantity} {product.unit_measure_name}
          </StyledProductActions>
        )}
      </Formik>
    </StyledProduct>
  )
}

export default Product
