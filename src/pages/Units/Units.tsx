import React, { useEffect } from 'react'
import Layout from 'components/Layout'
import { formatDate } from 'utils/date'
import { DataGrid, GridColDef } from '@material-ui/data-grid'
import { getUnits } from 'store/slices/unit/thunks'
import { useAppSelector, useAppDispatch } from 'hooks/appHooks'
import { CreateForm } from './CreateForm'
import { commonStatuses } from '../../helpers/config'

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 60,
    sortable: false,
    disableColumnMenu: true
  },
  {
    field: 'name',
    headerName: 'Единица измерения',
    minWidth: 250,
    sortable: false,
    disableColumnMenu: true
  },
  {
    field: 'status',
    valueGetter: ({ value }) => commonStatuses[value as number],
    headerName: 'Статус',
    width: 170,
    sortable: false,
    disableColumnMenu: true
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
  }
]

const Units = () => {
  const items = useAppSelector((state) => state.unit.items)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getUnits())
  }, [dispatch])
  return (
    <Layout title="Единицы измерения" action={<CreateForm />}>
      <DataGrid
        columns={columns}
        rows={items.data}
        loading={items.loading}
        pageSize={100}
      />
    </Layout>
  )
}

export default Units
