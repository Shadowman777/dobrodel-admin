import React, { FC, useEffect } from 'react'
import { Chip, Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import { getProductDetail } from 'store/slices/product/thunks'
import { useAppSelector, useAppDispatch } from 'hooks/appHooks'
import { ProductModalProps } from '../types'
import { StyledTable } from '../styled'
import { buildFormData } from '../../../utils/buildFormData'
import { productStatus, productTypes } from '../config'
import { Loader } from '../../../components/Loader'

export const ProductModal: FC<ProductModalProps> = ({ id, onClose }) => {
  const dispatch = useAppDispatch()
  const { loading, data } = useAppSelector((state) => state.product.detail)
  useEffect(() => {
    dispatch(getProductDetail(buildFormData(new FormData(), { id })))
  }, [dispatch, id])

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Просмотр детали ({data?.name})</DialogTitle>
      <DialogContent>
        {loading || !data ? (
          <Loader />
        ) : (
          <StyledTable>
            <thead>
              <tr>
                <th>Поле</th>
                <th>Значение</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ID</td>
                <td>{data.id}</td>
              </tr>
              <tr>
                <td>Название</td>
                <td>{data.name}</td>
              </tr>
              <tr>
                <td>Единица измерения</td>
                <td>{data.unit_measure_name}</td>
              </tr>
              <tr>
                <td>Количество</td>
                <td>{data.quantity}</td>
              </tr>
              <tr>
                <td>Тип товара</td>
                <td>{productTypes[data.id_type]}</td>
              </tr>
              <tr>
                <td>Категория</td>
                <td>
                  <Chip size="small" label={data.category_name} />
                </td>
              </tr>
              <tr>
                <td>Внутренняя категория</td>
                <td>
                  <Chip size="small" label={data.internal_category_name} />
                </td>
              </tr>
              <tr>
                <td>Описание</td>
                <td>{data.description}</td>
              </tr>
              <tr>
                <td>Налог</td>
                <td>{data.tax}</td>
              </tr>
              <tr>
                <td>Средняя цена по рынку</td>
                <td>{data.average_market_value}</td>
              </tr>
              <tr>
                <td>Цена</td>
                <td>{data.price}</td>
              </tr>
              <tr>
                <td>Фото</td>
                <td>
                  <img src={data.img} alt="" style={{ maxWidth: 300 }} />
                </td>
              </tr>
              <tr>
                <td>Характеристики</td>
                <td>
                  {!!data.detail &&
                    data.detail.map((item) => (
                      <p>
                        <strong>{item.name}</strong>: {item.value}
                      </p>
                    ))}
                </td>
              </tr>
              <tr>
                <td>Приоритет</td>
                <td>{data.sort}</td>
              </tr>
              <tr>
                <td>Статус</td>
                <td>{productStatus[data.status!]}</td>
              </tr>
            </tbody>
          </StyledTable>
        )}
      </DialogContent>
    </Dialog>
  )
}
