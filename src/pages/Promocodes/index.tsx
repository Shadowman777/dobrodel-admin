import React, { useEffect, useMemo } from 'react'
import Layout from 'components/Layout'
import { formatDate } from 'utils/date'
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridValueFormatterParams
} from '@material-ui/data-grid'
import {
  Box,
  Button,
  Grid,
  IconButton,
  Tooltip,
  MenuItem
} from '@material-ui/core'
import { Formik } from 'formik'
import DeleteIcon from '@material-ui/icons/Delete'
import { useAppSelector, useAppDispatch } from 'hooks/appHooks'
import { setConfig } from 'store/slices/promocode/slice'
import { FiltersWrapper } from 'components/FiltersWrapper'
import { DateField } from 'components/form/DateField'
import { Select, TextField } from 'components/form'
import {
  deletePromocode,
  getPromocodes,
  getPromocodeTypes
} from 'store/slices/promocode/thunks'
import { commonStatuses } from 'helpers/config'
import { CreateForm, EditForm } from './Model'
import { filterInitialValues } from './config'
import { IFiltersSchema } from './types'

const Promocodes = () => {
  const { items, types, filters } = useAppSelector((state) => state.promocode)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getPromocodes())
    if (!types.length) {
      dispatch(getPromocodeTypes())
    }
  }, [dispatch, filters])

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        field: 'id',
        headerName: 'ID',
        minWidth: 60,
        sortable: false,
        disableColumnMenu: true
      },
      {
        field: 'promo_code',
        headerName: 'Промокод',
        minWidth: 250,
        sortable: false,
        disableColumnMenu: true
      },
      {
        field: 'type',
        headerName: 'Тип',
        minWidth: 250,
        sortable: false,
        disableColumnMenu: true,
        valueGetter: ({ value }: GridValueFormatterParams) =>
          types.find((t) => t.id === value)?.name
      },
      {
        field: 'amount',
        headerName: 'Сумма',
        minWidth: 100,
        sortable: false,
        disableColumnMenu: true
      },
      {
        field: 'minimum_order_amount',
        headerName: 'Мин. сумма заказа',
        minWidth: 100,
        sortable: false,
        disableColumnMenu: true
      },
      {
        field: 'number_codes_per_user',
        headerName: 'Макс. кол. на пользователя',
        minWidth: 200,
        sortable: false,
        disableColumnMenu: true
      },
      {
        field: 'max_discount_amount',
        headerName: 'Макс. скидка на заказ',
        minWidth: 200,
        sortable: false,
        disableColumnMenu: true
      },
      {
        field: 'percentage_order',
        headerName: 'Скидка процент от заказа',
        minWidth: 200,
        sortable: false,
        disableColumnMenu: true
      },
      {
        field: 'max_activation_count',
        headerName: 'Макс. кол. активаций',
        minWidth: 200,
        sortable: false,
        disableColumnMenu: true
      },
      {
        field: 'date_validity',
        headerName: 'Дата действия промокода',
        width: 140,
        sortable: false,
        disableColumnMenu: true,
        valueFormatter: ({ value }: GridValueFormatterParams) =>
          formatDate(value as string)
      },
      {
        field: 'status',
        headerName: 'Статус',
        minWidth: 170,
        sortable: false,
        disableColumnMenu: true,
        valueGetter: ({ value }: GridValueFormatterParams) =>
          commonStatuses[value as number]
      },
      {
        field: 'created_at',
        headerName: 'Создана',
        width: 140,
        sortable: false,
        disableColumnMenu: true,
        valueFormatter: ({ value }: GridValueFormatterParams) =>
          formatDate(value as string)
      },
      {
        field: 'updated_at',
        headerName: 'Изменена',
        width: 140,
        sortable: false,
        disableColumnMenu: true,
        valueFormatter: ({ value }: GridValueFormatterParams) =>
          formatDate(value as string)
      },
      {
        field: '',
        headerName: 'Действия',
        disableColumnMenu: true,
        sortable: false,
        renderCell: ({ row }: GridCellParams) => (
          <>
            <EditForm id={row.id} />
            <Tooltip title="Удалить">
              <IconButton onClick={() => dispatch(deletePromocode(row.id))}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>
        ),
        minWidth: 100
      }
    ],
    [dispatch]
  )
  return (
    <Layout title="Промокоды" action={<CreateForm />}>
      <Filters />
      <DataGrid
        columns={columns}
        rowCount={items.count}
        rows={items.data}
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
  const types = useAppSelector((state) => state.promocode.types)
  const dispatch = useAppDispatch()
  const initialValues = useAppSelector((state) => state.promocode.filters)

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
          {({ handleSubmit, resetForm }) => (
            <form onSubmit={handleSubmit}>
              <Grid
                container
                spacing={2}
                style={{ marginBottom: '20px' }}
                alignItems="center"
              >
                <Grid item xs={12} sm={3}>
                  <Select label="Тип" name="type">
                    <MenuItem value={undefined}>-</MenuItem>
                    {types.map((item) => (
                      <MenuItem value={item.id} key={item.id}>
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
                  <TextField label="Название" name="name" />
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

export default Promocodes
