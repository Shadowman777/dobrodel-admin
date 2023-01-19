import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { Formik, useFormikContext, FormikProps } from 'formik'
import {
  Button,
  MenuItem,
  Grid,
  FormControl,
  FormHelperText,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Typography,
  IconButton,
  Tooltip
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import DeleteIcon from '@material-ui/icons/Delete'
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined'
import { toggleOpenCreateProduct } from 'store/slices/product/slice'
import {
  createProduct,
  editProduct,
  getProductDetail
} from 'store/slices/product/thunks'
import { TextField, Select } from 'components/form'
import { Edit as EditIcon } from '@material-ui/icons'
import { Loader } from 'components/Loader'
import { useAppSelector, useAppDispatch } from 'hooks/appHooks'
import { ModelFormProps, EditModelProps, ParametersProps } from '../types'
import { buildFormData } from '../../../utils/buildFormData'
import {
  createInitialValues,
  validationSchema,
  imgConfig,
  productTypes
} from '../config'
import { resizeImg } from '../../../utils/resizeImg'
import { StyledImagePreview } from '../styled'
import { IProductModelSchema } from '../../../types/products'
import { normalizeDetailToModel } from '../utils'

export const EditModel: FC<EditModelProps> = ({ id }) => {
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)
  const { error } = useAppSelector((state) => state.product.model)
  const detail = useAppSelector((state) => state.product.detail)

  useEffect(() => {
    if (open) {
      dispatch(getProductDetail(buildFormData(new FormData(), { id })))
    }
  }, [open, id, dispatch])

  return (
    <>
      <Tooltip title="Редактировать">
        <IconButton
          onClick={(e) => {
            e.stopPropagation()
            setOpen(true)
          }}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>
      {open && (
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle>Редактирование товара</DialogTitle>
          {error && <Alert severity="error">{error}</Alert>}
          {detail.loading || detail.data?.id !== id ? (
            <Loader />
          ) : (
            <Form
              handleClose={() => setOpen(false)}
              initialValues={normalizeDetailToModel(detail.data!)}
            />
          )}
        </Dialog>
      )}
    </>
  )
}

export const CreateModel: FC = () => {
  const dispatch = useAppDispatch()
  const { open, error } = useAppSelector((state) => state.product.model)
  const setOpen = useCallback(
    (value) => dispatch(toggleOpenCreateProduct(value)),
    [dispatch]
  )
  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Добавить
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Добавление товара</DialogTitle>
        {error && <Alert severity="error">{error}</Alert>}
        <Form
          handleClose={() => setOpen(false)}
          initialValues={createInitialValues}
        />
      </Dialog>
    </>
  )
}

export const Form: FC<ModelFormProps> = ({ handleClose, initialValues }) => {
  const dispatch = useAppDispatch()
  const onSubmit = useCallback(
    (values) => {
      const formData = buildFormData(new FormData(), values)
      if (values.id) {
        dispatch(editProduct(formData))
      } else {
        dispatch(createProduct(formData))
      }
    },
    [dispatch]
  )
  return (
    <Formik<IProductModelSchema>
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {(props) => <FormikForm {...props} handleClose={handleClose} />}
    </Formik>
  )
}

const FormikForm: FC<FormikProps<IProductModelSchema> & ModelFormProps> = ({
  handleSubmit,
  setFieldValue,
  values,
  touched,
  errors,
  handleClose
}) => {
  const units = useAppSelector((state) => state.unit.items.data)
  const categories = useAppSelector((state) => state.category.items.data)
  const internalCategories = useAppSelector(
    (state) => state.category.internal.data
  )
  const taxes = useAppSelector((state) => state.product.taxes.data)
  const suppliers = useAppSelector((state) => state.supplier.items.data)

  const img = useMemo(
    () =>
      values.image &&
      (typeof values.image === 'string'
        ? values.image
        : window.URL.createObjectURL(values.image)),
    [values.image]
  )
  return (
    <form onSubmit={handleSubmit}>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <TextField fullWidth label="Название" name="name" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Select name="type" label="Тип товара">
              {productTypes.map((option) => (
                <MenuItem value={option} key={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Select name="id_unit_measure" label="Единица измерения">
              {units.map((option) => (
                <MenuItem value={option.id} key={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              fullWidth
              label="Количество"
              type="number"
              name="quantity"
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <Select name="id_unit_measure_2" label="Единица измерения 2">
              {units.map((option) => (
                <MenuItem value={option.id} key={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              fullWidth
              label="Количество 2"
              type="number"
              name="quantity_2"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select name="id_category" label="Категория">
              {categories.map((option) => (
                <MenuItem value={option.id} key={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select name="id_internal_category" label="Внутренняя категория">
              {internalCategories.map((option) => (
                <MenuItem value={option.id} key={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Select name="id_tax" label="Налог">
              {taxes.map((option) => (
                <MenuItem value={option.id} key={option.id}>
                  {option.description}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Ср. цена по рынку"
              type="number"
              name="average_market_value"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField label="Цена" type="number" name="price" />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField label="Штрихкод" name="cod_product" />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Select name="id_supplier" label="Поставщик">
              {suppliers.map((option) => (
                <MenuItem value={option.id} key={option.id}>
                  {option.name} ({option.address})
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField multiline label="Описание" name="description" />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControl error={!!(touched.image && errors.image)}>
              <Button variant="contained" component="label">
                Картинка
                <input
                  type="file"
                  hidden
                  accept={'image/*'}
                  name="image"
                  onChange={(e) => {
                    const file = e.target.files && e.target.files[0]
                    if (file) {
                      resizeImg(file, imgConfig, (file) =>
                        setFieldValue('image', file)
                      )
                    }
                  }}
                />
              </Button>
              <FormHelperText>
                {/* {values.image?.name ?? (touched.image && errors.image)} */}
              </FormHelperText>
            </FormControl>
            {values.image && <StyledImagePreview src={img} alt="" />}
          </Grid>
          <Grid item sm={12}>
            <Parameters />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button type="button" color="primary" onClick={handleClose}>
          Отмена
        </Button>
        <Button color="primary" type="submit">
          {values.id ? 'Сохранить' : 'Добавить'}
        </Button>
      </DialogActions>
    </form>
  )
}
const Parameters: FC<ParametersProps> = () => {
  const { values, setFieldValue } = useFormikContext<IProductModelSchema>()
  return (
    <Grid container spacing={2}>
      <Grid item sm={12}>
        <Typography variant="h6" component="span">
          Характеристики
        </Typography>
        <IconButton
          type="button"
          color="primary"
          onClick={() =>
            setFieldValue('detail', [...values.detail, { name: '', value: '' }])
          }
        >
          <AddCircleOutlinedIcon />
        </IconButton>
      </Grid>
      {values.detail.map((value, idx) => (
        <Grid item sm={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={5}>
              <TextField
                label="Название"
                type="text"
                name={`detail[${idx}].name`}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Значение"
                type="text"
                name={`detail[${idx}].value`}
              />
            </Grid>
            <Grid item sm={1}>
              <Tooltip title="Удалить">
                <IconButton
                  type="button"
                  color="secondary"
                  onClick={() =>
                    setFieldValue(
                      'detail',
                      values.detail.filter((v) => v !== value)
                    )
                  }
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  )
}
