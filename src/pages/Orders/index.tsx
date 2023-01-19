import React, { FC, useEffect, useMemo } from 'react'
import Layout from 'components/Layout'
import { formatDate } from 'utils/date'
import { DataGrid, GridCellParams, GridColDef } from '@material-ui/data-grid'
import {
  Box,
  Button,
  Grid,
  IconButton,
  MenuItem,
  Tooltip
} from '@material-ui/core'
import { Formik } from 'formik'
import { useHistory } from 'react-router-dom'
import VisibilityIcon from '@material-ui/icons/Visibility'
import { FiltersWrapper } from 'components/FiltersWrapper'
import { DateField } from 'components/form/DateField'
import { useAppSelector, useAppDispatch } from 'hooks/appHooks'
import { getOrders, getOrderStatuses } from '../../store/slices/order/thunks'
import { setConfig } from '../../store/slices/order/slice'
import { getDates, getPoints } from '../../store/slices/point/thunks'
import { filterInitialValues } from './config'
import { IFiltersSchema } from './types'
import { TextField, Select } from '../../components/form'

const StatusCell: FC<{ value: any }> = ({ value }) => {
  const statuses = useAppSelector((state) => state.order.statuses)
  return <>{statuses.find((s) => s.status === value)?.name}</>
}

const DeliveryPointCell: FC<{ value: any }> = ({ value }) => {
  const points = useAppSelector((state) => state.point.items)
  return <>{points.find((s) => s.id === value)?.name}</>
}

const Orders = () => {
  const history = useHistory()
  const items = useAppSelector((state) => state.order.items)
  const filters = useAppSelector((state) => state.order.filters)
  const statuses = useAppSelector((state) => state.order.statuses)
  const dispatch = useAppDispatch()
  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'id',
        headerName: 'ID',
        width: 60,
        sortable: false,
        disableColumnMenu: true
      },
      {
        field: 'id_customer',
        headerName: 'ID пользователя',
        width: 60,
        sortable: false,
        disableColumnMenu: true
      },
      {
        field: 'id_delivery_point_',
        headerName: 'ID точки',
        width: 100,
        sortable: false,
        disableColumnMenu: true,
        renderCell: ({ row }) => `Точка ${row.id_delivery_point}`
      },
      {
        field: 'id_delivery_point',
        headerName: 'Точка доставки',
        minWidth: 250,
        sortable: false,
        disableColumnMenu: true,
        renderCell: ({ value }) => <DeliveryPointCell value={value!} />
      },
      {
        field: 'price_amount',
        headerName: 'Сумма',
        width: 110,
        sortable: false,
        disableColumnMenu: true
      },
      {
        field: 'total_amount',
        headerName: 'Сумма итого',
        width: 120,
        sortable: false,
        disableColumnMenu: true
      },
      {
        field: 'comment',
        headerName: 'Комментарий',
        minWidth: 170,
        sortable: false,
        disableColumnMenu: true
      },
      {
        field: 'order_code',
        headerName: 'Код заказа',
        width: 120,
        sortable: false,
        disableColumnMenu: true
      },
      {
        field: 'status',
        headerName: 'Статус',
        width: 120,
        sortable: false,
        disableColumnMenu: true,
        renderCell: ({ value }) => <StatusCell value={value!} />
      },
      {
        field: 'created_at',
        headerName: 'Создана',
        width: 140,
        sortable: false,
        disableColumnMenu: true,
        valueFormatter: ({ value }) => formatDate(value as string)
      },
      {
        field: 'updated_at',
        headerName: 'Изменена',
        width: 140,
        sortable: false,
        disableColumnMenu: true,
        valueFormatter: ({ value }) => formatDate(value as string)
      },
      {
        field: 'actions',
        headerName: 'Действия',
        width: 100,
        disableColumnMenu: true,
        sortable: false,
        renderCell: ({ row }: GridCellParams) => (
          <>
            <Tooltip title="Подробно">
              <IconButton onClick={() => history.push(`/orders/${row.id}`)}>
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
          </>
        )
      }
    ],
    []
  )
  useEffect(() => {
    if (!statuses.length) {
      dispatch(getOrderStatuses())
    }
    return () => {
      dispatch(setConfig(filterInitialValues))
    }
  }, [dispatch])
  useEffect(() => {
    dispatch(getOrders())
  }, [dispatch, filters])
  return (
    <Layout title="Заказы">
      <Filters />
      <DataGrid
        columns={columns}
        rowCount={items.count}
        rows={items.orders}
        loading={items.loading}
        pageSize={filters.limit}
        onPageSizeChange={(data) => {
          dispatch(setConfig({ offset: 0, limit: data }))
        }}
        paginationMode="server"
        onPageChange={(page) => {
          dispatch(setConfig({ offset: filters.limit * page }))
        }}
        page={filters.offset / filters.limit}
      />
    </Layout>
  )
}

const Filters = () => {
  const statuses = useAppSelector((state) => state.order.statuses)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getPoints())
  }, [])
  const points = useAppSelector((state) => state.point.items)
  const dates = useAppSelector((state) => state.point.dates)
  const initialValues = useAppSelector((state) => state.order.filters)

  return (
    <FiltersWrapper>
      {({ closeFilters }) => (
        <Formik<IFiltersSchema>
          initialValues={initialValues}
          onSubmit={(values) => {
            dispatch(setConfig(values))
            closeFilters()
          }}
        >
          {({ handleChange, setFieldValue, handleSubmit, resetForm }) => (
            <form onSubmit={handleSubmit}>
              <Grid
                container
                spacing={2}
                style={{ marginBottom: '20px' }}
                alignItems="center"
              >
                <Grid item xs={12} sm={3}>
                  <Select
                    label="Точка доставки"
                    name="id_delivery_points"
                    onChange={(e) => {
                      handleChange(e)
                      setFieldValue('id_delivery_date', undefined)
                      dispatch(getDates(e.target.value as number))
                    }}
                  >
                    <MenuItem value={undefined}>-</MenuItem>
                    {points.map((item) => (
                      <MenuItem value={item.id} key={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Select label="Дата доставки" name="id_delivery_date">
                    <MenuItem value={undefined}>-</MenuItem>
                    {dates.map((item) => (
                      <MenuItem value={item.id} key={item.id}>
                        {formatDate(item.date_start)} {' - '}
                        {formatDate(item.date_end)}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Select label="Статус" name="status">
                    <MenuItem value={undefined}>-</MenuItem>
                    {statuses.map((item) => (
                      <MenuItem value={item.status} key={item.status}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                style={{ marginBottom: '20px' }}
                alignItems="center"
              >
                <Grid item xs={12} sm={2}>
                  <TextField
                    label="№ заказа"
                    name="order_number"
                    type="number"
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <DateField
                    label="Период создания c"
                    name="date_create_start"
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <DateField
                    label="Период создания по"
                    name="date_create_end"
                  />
                </Grid>
                <Grid item sm={4}>
                  <Box display="flex">
                    <Box mr={2}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                      >
                        Получить
                      </Button>
                    </Box>
                    <Box>
                      <Button
                        type="button"
                        variant="contained"
                        color="default"
                        size="large"
                        onClick={() => {
                          resetForm({ values: filterInitialValues })
                          handleSubmit()
                          closeFilters()
                        }}
                      >
                        Сброс
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      )}
    </FiltersWrapper>
  )
}

export default Orders
