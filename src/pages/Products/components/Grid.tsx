import React, { FC, useEffect, useMemo, useState } from 'react'
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridValueFormatterParams
} from '@material-ui/data-grid'
import { deleteProduct, getProducts } from 'store/slices/product/thunks'

import { setConfig } from 'store/slices/product/slice'
import { IconButton, Tooltip } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import VisibilityIcon from '@material-ui/icons/Visibility'
import { useConfirm } from 'material-ui-confirm'
import { useAppSelector, useAppDispatch } from 'hooks/appHooks'

import { EditModel } from './Model'
import { EditModelProps } from '../types'
import { productStatus } from '../config'
import { ProductModal } from './ProductModal'

const DeleteButton: FC<EditModelProps> = ({ id }) => {
  const dispatch = useAppDispatch()
  const confirm = useConfirm()
  const handleClick = async () => {
    await confirm({
      description: 'Вы уверены, что хотите удалить товар?'
    })
    dispatch(deleteProduct({ id }))
  }
  return (
    <Tooltip title="Удалить">
      <IconButton onClick={handleClick}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  )
}

const Grid: FC = () => {
  const dispatch = useAppDispatch()

  const items = useAppSelector((state) => state.product.items)
  const taxes = useAppSelector((state) => state.product.taxes.data)
  const units = useAppSelector((state) => state.unit.items.data)
  const categories = useAppSelector((state) => state.category.items.data)
  const suppliers = useAppSelector((state) => state.supplier.items.data)
  const [detail, setDetail] = useState<any>()

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'id',
        headerName: 'ID',
        width: 60,
        disableColumnMenu: true,
        sortable: false
      },
      {
        field: 'name',
        headerName: 'Наименование',
        minWidth: 250,
        disableColumnMenu: true,
        sortable: false
      },
      {
        field: 'unit_measure_name',
        headerName: 'Ед. изм.',
        width: 70,
        disableColumnMenu: true,
        sortable: false
      },
      {
        field: 'quantity',
        headerName: 'Кол.',
        width: 70,
        disableColumnMenu: true,
        sortable: false
      },
      {
        field: 'category_name',
        headerName: 'Категория',
        width: 200,
        disableColumnMenu: true,
        sortable: false
      },
      {
        field: 'tax',
        headerName: 'Налог',
        minWidth: 100,
        disableColumnMenu: true,
        sortable: false,
        renderCell: ({ value }: GridCellParams) =>
          taxes.find((t) => t.value === value)?.description
      },
      {
        field: 'average_market_value',
        headerName: 'Средняя цена по рынку',
        minWidth: 100,
        disableColumnMenu: true,
        sortable: false
      },
      {
        field: 'price',
        headerName: 'Цена',
        minWidth: 100,
        disableColumnMenu: true,
        sortable: false
      },
      {
        field: 'id_supplier',
        headerName: 'Поставщик',
        minWidth: 150,
        disableColumnMenu: true,
        sortable: false,
        renderCell: ({ value }: GridCellParams) =>
          suppliers.find((t) => t.id === value)?.name
      },
      {
        field: 'img',
        headerName: 'Фото',
        minWidth: 100,
        disableColumnMenu: true,
        sortable: false,
        renderCell: ({ value }: GridCellParams) =>
          value ? (
            <img src={value as string} alt="" style={{ width: 50 }} />
          ) : null
      },
      {
        field: 'sort',
        headerName: 'Приоритет',
        minWidth: 60,
        disableColumnMenu: true,
        sortable: false
      },
      {
        field: 'status',
        headerName: 'Статус',
        minWidth: 60,
        disableColumnMenu: true,
        sortable: false,
        valueGetter: ({ value }: GridValueFormatterParams) =>
          productStatus[value as number]
      },
      {
        field: '',
        headerName: 'Действия',
        disableColumnMenu: true,
        sortable: false,
        renderCell: ({ row }: GridCellParams) => (
          <>
            <Tooltip title="Подробно">
              <IconButton onClick={() => setDetail(row)}>
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
            <EditModel id={row.id} />
            <DeleteButton id={row.id} />
          </>
        ),
        minWidth: 150
      }
    ],
    [taxes, categories, units]
  )
  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch, items.offset, items.limit, items.filters])
  return (
    <>
      <DataGrid
        columns={columns}
        loading={items?.loading}
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
      {!!detail && (
        <ProductModal id={detail.id} onClose={() => setDetail(undefined)} />
      )}
    </>
  )
}

export default Grid
