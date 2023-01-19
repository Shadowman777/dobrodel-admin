import React, { useEffect } from 'react'
import Layout from 'components/Layout'
import { DataGrid, GridColDef } from '@material-ui/data-grid'
import { getProducts } from 'store/slices/product/thunks'

import { setConfig } from 'store/slices/product/slice'
import { useAppSelector, useAppDispatch } from 'hooks/appHooks'
import { AddForm } from './AddForm'

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 60,
    sortable: false,
    disableColumnMenu: true
  },
  {
    field: 'id_category',
    headerName: 'ID категории',
    width: 100,
    sortable: false,
    disableColumnMenu: true
  },
  {
    field: 'category_name',
    headerName: 'Категория',
    minWidth: 250,
    sortable: false,
    disableColumnMenu: true
  },
  {
    field: 'name',
    headerName: 'Наименование',
    minWidth: 450,
    sortable: false,
    disableColumnMenu: true
  },
  {
    field: 'stock_count',
    headerName: 'Количество',
    width: 190,
    sortable: false,
    disableColumnMenu: true
  }
]

const Stock = () => {
  const items = useAppSelector((state) => state.product.items)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch, items.offset, items.limit])
  return (
    <Layout title="Склад" action={<AddForm />}>
      <DataGrid
        columns={columns}
        rows={items?.products}
        rowCount={items.count}
        pageSize={items.limit}
        onPageSizeChange={(data) => {
          dispatch(setConfig({ offset: 0, limit: data }))
        }}
        paginationMode="server"
        onPageChange={(page) => {
          dispatch(setConfig({ offset: items.limit * page }))
        }}
        page={items.offset / items.limit}
      />
    </Layout>
  )
}

export default Stock
