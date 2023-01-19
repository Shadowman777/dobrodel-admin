import React, { FC, useEffect, useMemo, useState } from 'react'
import Layout from 'components/Layout'
import { DataGrid, GridCellParams, GridColDef } from '@material-ui/data-grid'
import { useParams } from 'react-router-dom'
import { Button, Grid, Paper, Snackbar, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { Loader } from 'components/Loader'
import { useConfirm } from 'material-ui-confirm'
import { useAppSelector, useAppDispatch } from 'hooks/appHooks'
import { formatDate } from 'utils/date'
import {
  getOrderDetail,
  getOrderStatuses,
  setOrderStatus
} from 'store/slices/order/thunks'

import Adjustments from './Adjustments'
import { GivePromocode } from './GivePromocode'

const ReturnButton: FC = () => {
  const dispatch = useAppDispatch()
  const detail = useAppSelector((state) => state.order.detail)
  const [error, setError] = useState<any>(null)
  const confirm = useConfirm()
  const handleClick = async () => {
    await confirm({
      description: 'Вы уверены, что хотите вернуть заказ?'
    })
    const result = await dispatch(
      setOrderStatus({ id_order: detail!.id, new_status: 6 }) // 6 - статус возвращен
    )
    if (setOrderStatus.rejected.match(result)) {
      setError(result.error.message)
    }
  }
  return (
    <>
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
      {
        detail?.status === 1 ? (
          <Button onClick={handleClick} color="secondary" variant="contained">
            Вернуть средства за заказ
          </Button>
        ) : null // если оплачен(1)
      }
    </>
  )
}

const OrderDetail: FC = () => {
  const detail = useAppSelector((state) => state.order.detail)
  const dispatch = useAppDispatch()
  const { id } = useParams<{ id?: string }>()
  const [selected, setSelected] = useState<number>()
  const statuses = useAppSelector((state) => state.order.statuses)
  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'name',
        headerName: 'Наименование',
        valueGetter: ({ row }) => row.product_info.name,
        minWidth: 250,
        disableColumnMenu: true,
        sortable: false
      },
      {
        field: 'quantity',
        headerName: 'Количество',
        valueGetter: ({ row }) =>
          `${row.quantity} ${row.product_info.unit_measure_name}`,
        width: 150,
        disableColumnMenu: true,
        sortable: false
      },
      {
        field: 'category_name',
        headerName: 'Категория',
        valueGetter: ({ row }) => row.product_info.category_name,
        width: 200,
        disableColumnMenu: true,
        sortable: false
      },
      {
        field: 'price',
        headerName: 'Цена',
        valueGetter: ({ row }) => row.product_info.price,
        minWidth: 100,
        disableColumnMenu: true,
        sortable: false
      },
      {
        field: 'img',
        headerName: 'Фото',
        minWidth: 100,
        disableColumnMenu: true,
        sortable: false,
        renderCell: ({ row }: GridCellParams) =>
          row.product_info.img ? (
            <img
              src={row.product_info.img as string}
              alt=""
              style={{ width: 50 }}
            />
          ) : null
      },
      {
        field: '-',
        headerName: 'Корректировки',
        disableColumnMenu: true,
        sortable: false,
        valueGetter: ({ row }) => row.adjustment.length,
        minWidth: 150
      }
    ],
    []
  )

  useEffect(() => {
    dispatch(getOrderDetail(+id!))
    if (!statuses.length) {
      dispatch(getOrderStatuses())
    }
  }, [dispatch])

  return (
    <Layout
      title="Информация о заказе"
      action={
        <>
          <ReturnButton /> <GivePromocode />
        </>
      }
    >
      {detail ? (
        <>
          <Paper elevation={3} style={{ padding: 15, marginBottom: 20 }}>
            <Grid container spacing={2}>
              <Grid item sm={6}>
                <div>
                  <strong>ID</strong>: {detail.id}
                </div>
                <div>
                  <strong>Статус</strong>:{' '}
                  {statuses.find((s) => s.status === detail.status)?.name}
                </div>
                <div>
                  <strong>ID пользователя</strong>:{' '}
                  {detail.customer_info.id || ''}
                </div>
                <div>
                  <strong>Номер телефона</strong>:{' '}
                  <a href={`tel:${detail.customer_info.phone || ''}`}>
                    {detail.customer_info.phone || ''}
                  </a>
                </div>
                <div>
                  <strong>Дата совершения заказа</strong>:{' '}
                  {formatDate(detail.created_at)}
                </div>
                <div>
                  <strong>Сумма</strong>: {detail.price_amount}
                </div>
                <div>
                  <strong>Сумма доставки</strong>:{' '}
                  {detail.delivery_price_info?.amount}
                </div>
                <div>
                  <strong>Сумма итого</strong>: {detail.total_amount}
                </div>
              </Grid>
              <Grid item sm={6}>
                <div>
                  <strong>Адрес доставки</strong>:{' '}
                  {detail.delivery_points_info.address}
                </div>
                <div>
                  <strong>Точка доставки</strong>:{' '}
                  {detail.delivery_points_info.name}
                </div>
                <div>
                  <strong>Дата доставки</strong>:{' '}
                  {formatDate(detail.delivery_date_info.date_start)} -{' '}
                  {formatDate(detail.delivery_date_info.date_end)}
                </div>
                <div>
                  <strong>Код заказа</strong>: {detail.order_code}
                </div>
                <div>
                  <strong>Комментарий</strong>: {detail.comment}
                </div>
              </Grid>
            </Grid>
          </Paper>
          <Typography variant="h5">Список товаров</Typography>
          <DataGrid
            columns={columns}
            rows={detail.items}
            onRowClick={({ row }) => setSelected(row.id)}
          />
          {selected && (
            <Adjustments
              id={selected}
              onClose={() => {
                dispatch(getOrderDetail(+id!))
                setSelected(undefined)
              }}
            />
          )}
        </>
      ) : (
        <Loader />
      )}
    </Layout>
  )
}

export default OrderDetail
