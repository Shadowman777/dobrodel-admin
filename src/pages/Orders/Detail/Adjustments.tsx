import React, { FC, useMemo, useState } from 'react'
import { DataGrid, GridCellParams, GridColDef } from '@material-ui/data-grid'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Tooltip
} from '@material-ui/core'
import { Formik } from 'formik'
import { Edit as EditIcon } from '@material-ui/icons'
import DeleteIcon from '@material-ui/icons/Delete'
import ax from 'utils/ax'
import * as Yup from 'yup'
import { useConfirm } from 'material-ui-confirm'
import { useAppSelector, useAppDispatch } from 'hooks/appHooks'

import { Select, TextField } from '../../../components/form'
import { adjustmentTypes } from '../config'
import { getOrderDetail } from '../../../store/slices/order/thunks'
import { commonStatuses } from '../../../helpers/config'
import { Loader } from '../../../components/Loader'

const Adjustments: FC<{ onClose: any; id: number }> = ({ id, onClose }) => {
  const data = useAppSelector((state) =>
    state.order.detail?.items.find((item) => item.id === id)
  )!
  const dispatch = useAppDispatch()
  const [selected, setSelected] = useState<any>()
  const confirm = useConfirm()
  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'type',
        headerName: 'Тип',
        minWidth: 150,
        disableColumnMenu: true,
        sortable: false
      },
      {
        field: 'text',
        headerName: 'Комментарий',
        width: 250,
        disableColumnMenu: true,
        sortable: false
      },
      {
        field: 'amount',
        headerName: 'Сумма',
        width: 200,
        disableColumnMenu: true,
        sortable: false
      },
      {
        field: 'status',
        headerName: 'Статус',
        valueGetter: ({ value }) => commonStatuses[value as number],
        width: 100,
        disableColumnMenu: true,
        sortable: false
      },
      {
        field: 'actions',
        headerName: '',
        disableColumnMenu: true,
        sortable: false,
        renderCell: ({ row }: GridCellParams) => (
          <>
            <Tooltip title="Редактировать">
              <IconButton onClick={() => handleEdit(row)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Удалить">
              <IconButton onClick={() => handleDelete(row.id)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>
        ),
        minWidth: 150
      }
    ],
    []
  )
  const handleAdd = () => {
    setSelected({
      id_order: data.id_order,
      id_item_order: data.id,
      type: '',
      comment: '',
      amount: undefined
    })
  }
  const handleReset = () => {
    setSelected(undefined)
  }
  const handleDelete = async (id: number) => {
    await confirm({
      description: 'Вы уверены, что хотите удалить корректировку?'
    })
    await ax.post('/order/adjustment/delete', { id_adjustment: id })
    dispatch(getOrderDetail(data.id_order!))
  }
  const handleEdit = (row: any) => {
    setSelected({ ...row, comment: row.text })
  }
  const handleSubmit = (payload: any) => {
    if (payload.id) {
      ax.post('/order/adjustment/edit', {
        id_adjustment: payload.id,
        type: payload.type,
        comment: payload.comment,
        amount: payload.amount
      }).then(() => {
        dispatch(getOrderDetail(data.id_order))
        handleReset()
      })
    } else {
      ax.post('/order/adjustment/create', payload).then(() => {
        dispatch(getOrderDetail(data.id_order))
        handleReset()
      })
    }
  }

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Изменение корректировки</DialogTitle>
      <DialogContent>
        {data ? (
          <>
            <Paper elevation={3} style={{ padding: 15, marginBottom: 20 }}>
              <Grid container spacing={2}>
                <Grid item sm={6}>
                  <div>
                    <strong>ID товара</strong>: {data.product_info.id}
                  </div>
                  <div>
                    <strong>Название</strong>: {data.product_info.name}
                  </div>
                  <div>
                    <strong>Количество</strong>: {data.product_info.quantity}{' '}
                    {data.product_info.unit_measure_name}
                  </div>
                  <div>
                    <strong>Количество 2</strong>:{' '}
                    {data.product_info.quantity_2}{' '}
                    {data.product_info.unit_measure_2_name}
                  </div>
                </Grid>
                <Grid item sm={6}>
                  <div>
                    <strong>Сумма</strong>: {data.price_amount}
                  </div>
                  <div>
                    <strong>Сумма итого</strong>: {data.total_amount}
                  </div>
                </Grid>
              </Grid>
            </Paper>
            {!selected && (
              <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={handleAdd}
              >
                Добавить
              </Button>
            )}
            {selected && (
              <FormikForm
                values={selected}
                data={data}
                handleSubmit={handleSubmit}
                handleCancel={handleReset}
              />
            )}
            {!!data.adjustment.length && (
              <div style={{ height: 400 }}>
                <DataGrid columns={columns} rows={data.adjustment} hideFooter />
              </div>
            )}
          </>
        ) : (
          <Loader />
        )}
      </DialogContent>
    </Dialog>
  )
}

export const validationSchema = Yup.object({
  type: Yup.string().required(),
  comment: Yup.string().required(),
  amount: Yup.number().negative().required()
})

const FormikForm: FC<{
  handleCancel: () => void
  handleSubmit: any
  values: any
  data: any
}> = ({ handleCancel, handleSubmit, values, data }) => {
  return (
    <Formik
      initialValues={values}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, setFieldValue, values }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item sm={3}>
              <Select
                name="type"
                label="Тип"
                onChange={(e) => {
                  setFieldValue('type', e.target.value)
                  if (e.target.value === 'out_of_stock') {
                    setFieldValue('amount', -data.price_amount)
                  } else {
                    setFieldValue('amount', undefined)
                  }
                  setFieldValue(
                    'comment',
                    adjustmentTypes.find((a) => a.type === e.target.value)
                      ?.comment
                  )
                }}
              >
                {adjustmentTypes.map((option) => (
                  <MenuItem value={option.type} key={option.type}>
                    {option.comment}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item sm={3}>
              <TextField label="Комментарий" name="comment" />
            </Grid>
            <Grid item sm={3}>
              <TextField label="Сумма" type="number" name="amount" />
            </Grid>
            <Grid item sm={3}>
              <Button type="button" color="primary" onClick={handleCancel}>
                Отмена
              </Button>
              <Button color="primary" type="submit" variant="contained">
                {values.id ? 'Сохранить' : 'Добавить'}
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  )
}

export default Adjustments
