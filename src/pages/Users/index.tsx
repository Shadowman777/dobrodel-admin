import React, { useEffect } from 'react'
import Layout from 'components/Layout'
import { formatDate } from 'utils/date'
import { DataGrid, GridColDef } from '@material-ui/data-grid'
import { getUsers } from 'store/slices/user/thunks'
import { useAppSelector, useAppDispatch } from 'hooks/appHooks'
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
    field: 'phone',
    headerName: 'Номер телефона',
    width: 250,
    sortable: false,
    disableColumnMenu: true
  },
  {
    field: 'email',
    headerName: 'Email',
    minWidth: 170,
    sortable: false,
    disableColumnMenu: true
  },
  {
    field: 'firstName',
    headerName: 'Имя',
    minWidth: 170,
    sortable: false,
    disableColumnMenu: true
  },
  {
    field: 'lastName',
    headerName: 'Фамилия',
    minWidth: 170,
    sortable: false,
    disableColumnMenu: true
  },
  {
    field: 'status',
    headerName: 'Статус',
    width: 170,
    sortable: false,
    disableColumnMenu: true,
    valueGetter: ({ value }) => commonStatuses[value as number]
  },
  {
    field: 'last_date_authorization',
    headerName: 'Последняя авторизация',
    width: 200,
    sortable: false,
    disableColumnMenu: true,
    valueFormatter: ({ value }) => formatDate(value as string)
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

const Users = () => {
  const items = useAppSelector((state) => state.user.items)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])
  return (
    <Layout title="Пользователи">
      <DataGrid
        columns={columns}
        rows={items.data}
        loading={items.loading}
        pageSize={100}
      />
    </Layout>
  )
}

export default Users
