import React, { useEffect } from 'react'
import { useAppDispatch } from 'hooks/appHooks'
import Layout from 'components/Layout'
import { formatDate } from 'utils/date'
import { DataGrid, GridColDef } from '@material-ui/data-grid'
import { useAppSelector } from '../../hooks/appHooks'
import { CreateForm } from './CreateForm'
import { getCategories } from '../../store/slices/category/thunks'
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
    field: 'id_parent',
    headerName: 'ID родителя',
    minWidth: 100,
    sortable: false,
    disableColumnMenu: true
  },
  {
    field: 'name_parent',
    headerName: 'Наименование родителя',
    minWidth: 250,
    sortable: false,
    disableColumnMenu: true,
    valueFormatter: (params) => {
      const row = params.api.getRow(params.row.id_parent)
      return row?.name ?? '-'
    }
  },
  {
    field: 'name',
    headerName: 'Наименование',
    minWidth: 250,
    sortable: false,
    disableColumnMenu: true
  },
  {
    field: 'sort',
    headerName: 'Приоритет',
    width: 60,
    sortable: false,
    disableColumnMenu: true
  },
  {
    field: 'status',
    headerName: 'Статус',
    minWidth: 170,
    sortable: false,
    disableColumnMenu: true,
    valueGetter: ({ value }) => commonStatuses[value as number]
  },
  {
    field: 'created_at',
    headerName: 'Создана',
    width: 170,
    sortable: false,
    disableColumnMenu: true,
    valueFormatter: ({ value }) => formatDate(value as string)
  },
  {
    field: 'updated_at',
    headerName: 'Изменена',
    width: 170,
    sortable: false,
    disableColumnMenu: true,
    valueFormatter: ({ value }) => formatDate(value as string)
  }
]

const Categories = () => {
  const items = useAppSelector((state) => state.category.items)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])
  return (
    <Layout title="Категории" action={<CreateForm />}>
      <DataGrid
        columns={columns}
        rows={items.data}
        loading={items.loading}
        pageSize={100}
      />
    </Layout>
  )
}

export default Categories
