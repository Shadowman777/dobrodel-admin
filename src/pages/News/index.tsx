import React, { useEffect, useState, useMemo } from 'react'
import Layout from 'components/Layout'
import { formatDate } from 'utils/date'
import { DataGrid, GridCellParams, GridColDef } from '@material-ui/data-grid'
import { IconButton, Tooltip } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility'
import { useAppDispatch } from 'hooks/appHooks'
import { useAppSelector } from '../../hooks/appHooks'
import { CreateModel, EditModel } from './Model'
import { getNews } from '../../store/slices/news/thunks'
import { Card } from './Card'
import { newsTypes, statuses } from './config'
import { UpdateStatusButton } from './UpdateStatusButton'

const News = () => {
  const items = useAppSelector((state) => state.news.items)
  const [detail, setDetail] = useState<number | undefined>(undefined)
  const dispatch = useAppDispatch()

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        field: 'id',
        headerName: 'ID',
        width: 60,
        sortable: false,
        resizable: false,
        disableColumnMenu: true
      },
      {
        field: 'title',
        headerName: 'Заголовок',
        minWidth: 250,
        sortable: false,
        resizable: false,
        disableColumnMenu: true
      },
      {
        field: 'image_preview_url',
        headerName: 'Превью',
        minWidth: 100,
        sortable: false,
        resizable: false,
        disableColumnMenu: true,
        renderCell: ({ value }: GridCellParams) =>
          value ? (
            <img src={value as string} alt="" style={{ width: 50 }} />
          ) : null
      },
      {
        field: 'type',
        headerName: 'Тип',
        minWidth: 100,
        sortable: false,
        resizable: false,
        disableColumnMenu: true,
        valueGetter: ({ value }) =>
          newsTypes.find((t) => t.type === value)?.label
      },
      {
        field: 'status',
        headerName: 'Статус',
        minWidth: 100,
        sortable: false,
        resizable: false,
        disableColumnMenu: true,
        valueGetter: ({ value }) => statuses[value as number]
      },
      {
        field: 'created_at',
        headerName: 'Создана',
        width: 140,
        sortable: false,
        resizable: false,
        disableColumnMenu: true,
        valueFormatter: ({ value }) => formatDate(value as string)
      },
      {
        field: 'updated_at',
        headerName: 'Изменена',
        width: 140,
        sortable: false,
        resizable: false,
        disableColumnMenu: true,
        valueFormatter: ({ value }) => formatDate(value as string)
      },
      {
        field: '',
        headerName: 'Действия',
        disableColumnMenu: true,
        sortable: false,
        renderCell: ({ row }: GridCellParams) => (
          <>
            <Tooltip title="Подробно">
              <IconButton onClick={() => setDetail(row.id)}>
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
            <EditModel id={row.id} />
          </>
        ),
        minWidth: 100
      },
      {
        field: 'st',
        headerName: 'Статус',
        disableColumnMenu: true,
        sortable: false,
        renderCell: ({ row }: GridCellParams) => (
          <>
            <UpdateStatusButton id={row.id} status={1} />
            {row.status === 0 && <UpdateStatusButton id={row.id} status={2} />}
            {row.status === 2 ||
              (row.status === 1 && (
                <UpdateStatusButton id={row.id} status={0} />
              ))}
          </>
        ),
        minWidth: 100
      }
    ],
    [setDetail]
  )

  useEffect(() => {
    dispatch(getNews())
  }, [dispatch])
  return (
    <Layout title="Новости" action={<CreateModel />}>
      <DataGrid columns={columns} rows={items.news} pageSize={100} />
      {!!detail && <Card id={detail} onClose={() => setDetail(undefined)} />}
    </Layout>
  )
}

export default News
