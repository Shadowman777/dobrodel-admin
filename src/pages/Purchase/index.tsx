import React, { useEffect } from 'react'
import Layout from 'components/Layout'
import { formatDate } from 'utils/date'
import { getPurchases } from 'store/slices/purchase/thunks'
import { useAppSelector, useAppDispatch } from 'hooks/appHooks'
import { Button } from '@material-ui/core'
import { useHistory } from 'react-router'
import { getOrderStatuses } from 'store/slices/order/thunks'
import { CreateForm } from './CreateForm'
import { StyledOrder, StyledOrderColumn, StyledOrderList } from './styled'

const Purchase = () => {
  const history = useHistory()
  const items = useAppSelector((state) => state.purchase.items)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getPurchases())
    dispatch(getOrderStatuses())
  }, [])
  return (
    <Layout title="Заявки" action={<CreateForm />}>
      <StyledOrderList>
        {items.data.map((item) => (
          <StyledOrder key={item.id} status={item.status}>
            <StyledOrderColumn>
              <div>Заказ #{item.id}</div>
              <div>
                {item.type_name} {formatDate(item.date_start)} -{' '}
                {formatDate(item.date_end)}
              </div>
              <div>Создана: {formatDate(item.created_at)}</div>
            </StyledOrderColumn>
            <StyledOrderColumn>
              <div>Товаров: {item.count_product}</div>
              <div>Заказов: {item.count_order}</div>
            </StyledOrderColumn>
            <StyledOrderColumn>
              <Button
                variant="contained"
                color="primary"
                onClick={() => history.push(`/purchase/${item.id}`)}
              >
                Открыть
              </Button>
            </StyledOrderColumn>
          </StyledOrder>
        ))}
      </StyledOrderList>
    </Layout>
  )
}

export default Purchase
