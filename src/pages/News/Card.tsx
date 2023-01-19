import React, { FC, useCallback, useEffect } from 'react'
import {
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography
} from '@material-ui/core'
import { toggleOpenCreateNews } from 'store/slices/news/slice'
import { formatDate } from 'utils/date'
import { useAppDispatch, useAppSelector } from 'hooks/appHooks'
import { Loader } from '../../components/Loader'
import { StyledTable } from './styled'
import { getNewsDetail } from '../../store/slices/news/thunks'
import { CardProps } from './types'
import { newsTypes, statuses } from './config'

export const Card: FC<CardProps> = ({ id, onClose }) => {
  const dispatch = useAppDispatch()
  const setOpen = useCallback(
    (value) => dispatch(toggleOpenCreateNews(value)),
    [dispatch]
  )
  const { loading, data } = useAppSelector((state) => state.news.detail)

  useEffect(() => {
    dispatch(getNewsDetail({ id_news: id }))
  }, [dispatch, id])

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Добавить
      </Button>
      <Dialog open onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle>Просмотр детали ({data?.title})</DialogTitle>
        <DialogContent>
          {loading || !data ? (
            <Loader />
          ) : (
            <>
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
                    <td>{data.title}</td>
                  </tr>
                  <tr>
                    <td>Описание</td>
                    <td>{data.description}</td>
                  </tr>
                  <tr>
                    <td>Превью</td>
                    <td>
                      <img
                        src={data.image_preview_url}
                        alt=""
                        style={{ maxWidth: 300 }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Основная картинка</td>
                    <td>
                      <img
                        src={data.image_url}
                        alt=""
                        style={{ maxWidth: 300 }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Тип</td>
                    <td>
                      {newsTypes.find((t) => t.type === data.type)?.label}
                    </td>
                  </tr>
                  {/* <tr> */}
                  {/*  <td>Товары</td> */}
                  {/*  <td> */}
                  {/*    {!!data.detail && */}
                  {/*      data.detail.map((item) => ( */}
                  {/*        <p> */}
                  {/*          <strong>{item.name}</strong>: {item.value} */}
                  {/*        </p> */}
                  {/*      ))} */}
                  {/*  </td> */}
                  {/* </tr> */}
                  <tr>
                    <td>Статус</td>
                    <td>{statuses[data.status!]}</td>
                  </tr>
                  <tr>
                    <td>Создан</td>
                    <td>{formatDate(data.created_at)}</td>
                  </tr>
                  <tr>
                    <td>Изменен</td>
                    <td>{formatDate(data.updated_at)}</td>
                  </tr>
                </tbody>
              </StyledTable>
              <Typography variant="h6" component="span">
                Товары
              </Typography>

              <div>
                {data.promotion_product.map((product) => (
                  <div>
                    {product.product_info.name}{' '}
                    <Chip
                      label={product.product_info.category_name}
                      size="small"
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
