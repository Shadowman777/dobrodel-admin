import React, { FC, useCallback, useEffect, useState } from 'react'
import { Formik } from 'formik'
import {
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  MenuItem,
  Tooltip,
  IconButton,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails
} from '@material-ui/core'
import { Loader } from 'components/Loader'
import {
  Edit as EditIcon,
  ExpandMore as ExpandMoreIcon
} from '@material-ui/icons'
import {
  clearDetail,
  toggleOpenModelPromocode
} from 'store/slices/promocode/slice'
import { Alert } from '@material-ui/lab'
import { Checkbox, Select, TextField } from 'components/form'
import { IFormProps, IPromocodeModelSchema } from 'types/promocodes'
import { DateField } from 'components/form/DateField'
import { useAppSelector, useAppDispatch } from 'hooks/appHooks'
import { buildFormData } from 'utils/buildFormData'
import {
  createPromocode,
  editPromocode,
  getPromocode
} from 'store/slices/promocode/thunks'
import { getPoints } from 'store/slices/point/thunks'
import { createInitialValues, modelValidationSchema } from './config'
import { normalizeDetailToModel } from './utils'

export const EditForm: FC<{ id: number }> = ({ id }) => {
  const dispatch = useAppDispatch()
  const { open, error } = useAppSelector((state) => state.promocode.model)
  const { loading, data } = useAppSelector((state) => state.promocode.detail)
  const handleOpen = useCallback(
    (value: boolean) => {
      if (value) {
        dispatch(toggleOpenModelPromocode(id))
        dispatch(getPromocode(id))
      } else {
        dispatch(toggleOpenModelPromocode(false))
        dispatch(clearDetail())
      }
    },
    [dispatch, id]
  )
  const handleSubmit = useCallback(
    (values) => {
      Object.keys(values).forEach((key) => {
        if (values[key] === '') {
          delete values[key]
        }
      })
      const formData = buildFormData(new FormData(), {
        ...values,
        id_promo_code: id
      })
      dispatch(editPromocode(formData))
    },
    [dispatch, id]
  )
  return (
    <>
      <Tooltip title="Редактировать">
        <IconButton onClick={() => handleOpen(true)}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      {open === id && (
        <Dialog open onClose={() => handleOpen(false)} fullWidth maxWidth="md">
          <DialogTitle>Редактирование промокода</DialogTitle>
          {error && <Alert severity="error">{error}</Alert>}
          {loading ? (
            <Loader />
          ) : (
            <Form
              handleSubmit={handleSubmit}
              handleClose={() => handleOpen(false)}
              initialValues={normalizeDetailToModel(data!)}
            />
          )}
        </Dialog>
      )}
    </>
  )
}
export const CreateForm: FC = () => {
  const dispatch = useAppDispatch()
  const { open, error } = useAppSelector((state) => state.promocode.model)
  const setOpen = useCallback(
    (value) => dispatch(toggleOpenModelPromocode(value)),
    [dispatch]
  )
  const [showTip, setShowTip] = useState(true)
  const handleSubmit = useCallback(
    (values) => {
      Object.keys(values).forEach((key) => {
        if (values[key] === '') {
          delete values[key]
        }
      })
      if (![3, 4].includes(values.type)) {
        delete values.id_user
      }
      const formData = buildFormData(new FormData(), values)
      dispatch(createPromocode(formData))
    },
    [dispatch]
  )
  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Добавить
      </Button>
      <Dialog
        open={open === true}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Добавление промокода</DialogTitle>
        {error && <Alert severity="error">{error}</Alert>}
        <Form
          handleSubmit={handleSubmit}
          handleClose={() => setOpen(false)}
          initialValues={createInitialValues}
        />
        <Accordion expanded={showTip} onChange={() => setShowTip(!showTip)}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Подсказка по полям</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <ol>
                <li>
                  <strong>Промокод</strong> - Название промокода, которое
                  пользователь будет вводить в поле Промокод
                </li>
                <li>
                  <strong>Максимальная сумма по промокоду, руб</strong> -
                  Максимальная сумма, на которую можно сделать скидку по
                  промокоду
                </li>
                <li>
                  <strong>Минимальная сумма заказа, руб</strong> - Минимальная
                  сумма заказа, чтобы применить промокод
                </li>
                <li>
                  <strong>
                    Максимальное количество применений одним пользователем
                  </strong>{' '}
                  - Сколько раз один пользователь может воспользоваться
                  промокодом
                </li>
                <li>
                  <strong>Тип</strong> - Есть 2 типа:
                  <ul>
                    <li>
                      <strong>Первый</strong> - Сумма, прямая скидка в рублях.
                    </li>
                    <li>
                      <strong>Второй</strong> - % от заказа
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Дата действия</strong> - дата, до которой возможно
                  применить промокод
                </li>
                <li>
                  <strong>Максимальная скидка на один заказ, руб</strong> -
                  максимальная скидка на 1 заказ в рублях
                </li>
                <li>
                  <strong>Скидка на один заказ в %</strong> - скидка, которую
                  предоставляет промокод в % на один заказ
                </li>
                <li>
                  <strong>Количество активаций</strong> - максимальное
                  количество активаций промокода
                </li>
                <li>
                  <strong>Описание</strong> - Текстовое описание промокод:
                  зачем, почему, для чего, для кого
                </li>
                <li>
                  <strong>Только на первый заказ</strong> - Параметр определяет
                  на какой заказ действует промокод
                </li>
              </ol>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Dialog>
    </>
  )
}

export const Form: FC<IFormProps> = ({
  handleClose,
  initialValues,
  handleSubmit
}) => {
  const deliveryPoints = useAppSelector((state) => state.point.items)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (!deliveryPoints.length) {
      dispatch(getPoints())
    }
  }, [deliveryPoints, dispatch])
  const types = useAppSelector((state) => state.promocode.types)
  return (
    <Formik<IPromocodeModelSchema>
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={modelValidationSchema}
    >
      {({ handleSubmit, values, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              {[3, 4].includes(values.type) && (
                <Grid item xs={12}>
                  <TextField label="ID пользователя" name="id_user" />
                </Grid>
              )}
              <Grid item xs={6} sm={3}>
                <TextField label="Промокод" name="promo_code" />
              </Grid>
              <Grid item xs={6} sm={3}>
                <Select name="type" label="Тип">
                  {types.map((option) => (
                    <MenuItem value={option.id} key={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Максимальная сумма по промокоду, руб"
                  name="amount"
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  label="Минимальная сумма заказа, руб"
                  name="minimum_order_amount"
                />
              </Grid>
              <Grid item xs={6} sm={7}>
                <TextField
                  label="Максимальное количество применений одним пользователем"
                  name="number_codes_per_user"
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  label="Максимальная скидка на один заказ, руб"
                  name="max_discount_amount"
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  label="Скидка на один заказ в %"
                  name="percentage_order"
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  label="Количество активаций"
                  name="max_activation_count"
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <DateField label="Дата действия" name="date_validity" />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Checkbox
                  label="Только на первый заказ"
                  name="only_first_order"
                  onChange={() =>
                    setFieldValue(
                      'only_first_order',
                      values.only_first_order ? 0 : 1
                    )
                  }
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Select
                  name="delivery_points"
                  label="Точка доставки"
                  multiple
                  value={
                    !values.delivery_points.length
                      ? [0]
                      : values.delivery_points
                  }
                  onChange={(e) => {
                    const value = e.target.value as number[]
                    const newValue =
                      value.slice(-1).pop() === 0 ||
                      value.length === deliveryPoints.length
                        ? []
                        : value.filter((v) => v !== 0)
                    setFieldValue('delivery_points', newValue)
                  }}
                >
                  <MenuItem value={0}>Все</MenuItem>
                  {deliveryPoints.map((option) => (
                    <MenuItem value={option.id} key={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField multiline label="Описание" name="description" />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button type="button" color="primary" onClick={handleClose}>
              Отмена
            </Button>
            <Button color="primary" type="submit">
              {initialValues.id ? 'Сохранить' : 'Добавить'}
            </Button>
          </DialogActions>
        </form>
      )}
    </Formik>
  )
}
