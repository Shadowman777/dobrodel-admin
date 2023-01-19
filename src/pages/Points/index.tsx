import React, { useEffect, useMemo } from 'react'
import Layout from 'components/Layout'
import { DataGrid, GridColDef, GridSortModel } from '@material-ui/data-grid'

import { Button } from '@material-ui/core'
import { setDeliveryDatePointId, setSort } from 'store/slices/point/slice'
import { formatDate } from 'utils/date'
import { useAppSelector, useAppDispatch } from 'hooks/appHooks'
import { CreateForm } from './CreateForm'
import { getPoints } from '../../store/slices/point/thunks'
import { DeliveryDates } from './DeliveryDates'
import { commonStatuses } from '../../helpers/config'
import { Import } from './Import'

const Points = () => {
  const deliveryDatePointId = useAppSelector(
    (state) => state.point.deliveryDatePointId
  )
  const [sortModel, setSortModel] = React.useState<GridSortModel>([])
  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'id',
        headerName: 'ID',
        width: 100,
        sortable: false,
        resizable: false,
        disableColumnMenu: true,
        valueGetter: ({ value }) => `Точка ${value}`
      },
      {
        field: 'name',
        headerName: 'Наименование',
        minWidth: 250,
        sortable: true,
        resizable: false,
        disableColumnMenu: true
      },
      {
        field: 'address',
        headerName: 'Адрес',
        minWidth: 350,
        sortable: true,
        resizable: false,
        disableColumnMenu: true
      },
      {
        field: 'gps_coordinates',
        headerName: 'ГЕО-координаты',
        width: 250,
        sortable: true,
        resizable: false,
        disableColumnMenu: true
      },
      {
        field: 'status',
        headerName: 'Статус',
        width: 170,
        sortable: true,
        resizable: false,
        disableColumnMenu: true,
        valueGetter: ({ value }) => commonStatuses[value as number]
      },
      {
        field: 'created_at',
        headerName: 'Дата создания',
        width: 170,
        sortable: true,
        resizable: false,
        disableColumnMenu: true,
        valueFormatter: ({ value }) => formatDate(value as string)
      },
      {
        field: 'status',
        headerName: 'Даты доставки',
        minWidth: 170,
        sortable: false,
        resizable: false,
        renderCell: ({ row }) => (
          <Button onClick={() => dispatch(setDeliveryDatePointId(row.id))}>
            Даты доставки
          </Button>
        )
      }
    ],
    []
  )
  const items = useAppSelector((state) => state.point.items)
  const dispatch = useAppDispatch()
  const handleSortModelChange = (model: GridSortModel) => {
    setSortModel(model)
    const sort = model[0]
      ? { sort: model[0].field, type: model[0].sort?.toUpperCase() }
      : {}
    dispatch(setSort(sort))
  }
  useEffect(() => {
    dispatch(getPoints())
  }, [dispatch, sortModel])
  useEffect(() => {
    return () => {
      dispatch(setSort({}))
    }
  }, [])
  return (
    <Layout title="Точки доставки" action={[<CreateForm />, <Import />]}>
      <DataGrid
        columns={columns}
        rows={items}
        sortingMode="server"
        sortModel={sortModel}
        onSortModelChange={handleSortModelChange}
      />
      {!!deliveryDatePointId && (
        <DeliveryDates
          onClose={() => dispatch(setDeliveryDatePointId(undefined))}
          id={deliveryDatePointId}
        />
      )}
    </Layout>
  )
}

export default Points
