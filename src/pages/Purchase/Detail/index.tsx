import React, { useEffect, useState } from 'react'
import Layout from 'components/Layout'
import { getPurchase, purchaseAccumulation } from 'store/slices/purchase/thunks'
import { useHistory, useParams } from 'react-router-dom'
import { Button, Chip, Typography } from '@material-ui/core'
import { useAppSelector, useAppDispatch } from 'hooks/appHooks'
import { resetDetail } from 'store/slices/purchase/slice'
import Product from './Product'
import {
  StyledAccumulateButton,
  StyledButtonGroup,
  StyledPaper,
  StyledProductList
} from './styled'

const Detail = () => {
  const { data, loading, accumulation } = useAppSelector(
    (state) => state.purchase.detail
  )
  const [supplier, setSupplier] = useState<number | null>(null)
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const history = useHistory()
  const accumulate = () => {
    dispatch(purchaseAccumulation(+id))
  }
  useEffect(() => {
    dispatch(getPurchase(+id))
    return () => {
      dispatch(resetDetail())
    }
  }, [])
  useEffect(() => {
    if (data) {
      setSupplier(data.supplier[0].id_supplier)
    }
  }, [data])
  if (loading || !data) return null
  return (
    <Layout title="Сборка заявки">
      <StyledButtonGroup color="primary">
        {data.supplier.map((item) => (
          <Button
            key={item.id_supplier}
            variant={item.id_supplier === supplier ? 'contained' : 'outlined'}
            onClick={() => setSupplier(item.id_supplier)}
          >
            {item.supplier_name}
          </Button>
        ))}
      </StyledButtonGroup>
      <StyledPaper variant="outlined">
        <Typography variant="h6" component="h2">
          Список товаров к закупке
        </Typography>
        <StyledProductList>
          {data.products
            .filter((product) => product.id_supplier === supplier)
            .map((product) => (
              <Product key={product.id_product} product={product} />
            ))}
        </StyledProductList>
        <StyledAccumulateButton
          color="primary"
          variant="contained"
          onClick={accumulate}
        >
          Сформировать заказы
        </StyledAccumulateButton>
        {accumulation && (
          <StyledPaper>
            <Typography paragraph>
              Заказы укомплектованы товарами данного поставщика -%/
              {accumulation.overall_staffing_percentage}%. Полностью
              укомплектованные заказы:{' '}
              {accumulation.completeness.map((item) => (
                <>
                  <Chip
                    onClick={() => history.push(`/purchase/${id}/${item}`)}
                    key={item}
                    label={item}
                  />{' '}
                </>
              ))}
              <div>
                Заказы требующие вашего внимания:{' '}
                {accumulation.not_enough_goods.map((item) => (
                  <>
                    <Chip
                      onClick={() =>
                        history.push(`/purchase/${id}/${item.id_order}`)
                      }
                      key={item.id_order}
                      label={`ID(${item.id_order}) - ${item.staffing_percentage}%`}
                    />{' '}
                  </>
                ))}
              </div>
            </Typography>
          </StyledPaper>
        )}
        <Button color="primary" variant="contained" disabled>
          Завершить заявку
        </Button>
      </StyledPaper>
    </Layout>
  )
}

export default Detail
