import React, { useEffect } from 'react'
import Layout from 'components/Layout'
import { orderGet } from 'store/slices/purchase/thunks'
import { useParams } from 'react-router-dom'
import { Button, Typography } from '@material-ui/core'
import { useAppSelector, useAppDispatch } from 'hooks/appHooks'
import { resetOrder } from 'store/slices/purchase/slice'
import Product from './Product'
import { StyledPaper, StyledProductList } from './styled'

const Order = () => {
  const { data, loading } = useAppSelector((state) => state.purchase.order)
  const { idPurchase, idOrder } =
    useParams<{ idPurchase: string; idOrder: string }>()
  const dispatch = useAppDispatch()
  const load = () => {
    dispatch(
      orderGet({
        id_order: +idOrder,
        id_purchase: +idPurchase
      })
    )
  }
  useEffect(() => {
    load()
    return () => {
      dispatch(resetOrder())
    }
  }, [])
  if (loading || !data) return null
  return (
    <Layout
      title={`Заказ №${idOrder}`}
      action={
        <Button variant="contained" disabled>
          Позвонить пользователю
        </Button>
      }
    >
      <StyledPaper variant="outlined">
        <Typography variant="h6" component="h2">
          Список товаров к закупке
        </Typography>
        <StyledProductList>
          {data.products.map((product) => (
            <Product key={product.id_product} product={product} />
          ))}
        </StyledProductList>
        <Button color="primary" variant="contained" onClick={load}>
          Обновить
        </Button>
        <Typography>
          Если остались товары, которые требуют замены и Вы не дозвонились до
          пользователя, <br />
          SMS будет отправлена Автоматически.
        </Typography>
      </StyledPaper>
    </Layout>
  )
}

export default Order
