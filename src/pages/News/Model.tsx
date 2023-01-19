import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { Formik, FormikProps } from 'formik'
import {
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  MenuItem,
  FormControl,
  FormHelperText,
  Typography,
  IconButton,
  Tooltip
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { Select, TextField } from 'components/form'
import { INewsModelSchema, NewsType } from 'types/news'
import { toggleOpenCreateNews } from 'store/slices/news/slice'
import { Edit as EditIcon } from '@material-ui/icons'
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined'
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridValueFormatterParams
} from '@material-ui/data-grid'
import { productStatus } from 'pages/Products/config'
import { useAppSelector, useAppDispatch } from 'hooks/appHooks'
import { buildFormData } from 'utils/buildFormData'
import { resizeImg } from 'utils/resizeImg'
import { IModelFormProps, EditModelProps } from './types'
import { imgConfig, initialValues, newsTypes, validationSchema } from './config'
import { StyledImagePreview } from './styled'
import {
  addNewsProduct,
  createNews,
  editNews,
  getNewsDetail
} from '../../store/slices/news/thunks'
import { ProductSelect } from '../../components/ProductSelect'

import { Loader } from '../../components/Loader'
import { UpdateStatusButton } from './UpdateStatusButton'
import { normalizeDetailToModel } from './utils'

export const EditModel: FC<EditModelProps> = ({ id }) => {
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)
  const { error } = useAppSelector((state) => state.news.model)
  const { loading, data } = useAppSelector((state) => state.news.detail)

  useEffect(() => {
    if (open) {
      dispatch(getNewsDetail({ id_news: id }))
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
          <DialogTitle>Редактирование новости/акции</DialogTitle>
          {error && <Alert severity="error">{error}</Alert>}
          {loading || data?.id !== id ? (
            <Loader />
          ) : (
            <Form
              handleClose={() => setOpen(false)}
              initialValues={normalizeDetailToModel(data!)}
            />
          )}
        </Dialog>
      )}
    </>
  )
}

export const CreateModel: FC = () => {
  const dispatch = useAppDispatch()
  const { open, error } = useAppSelector((state) => state.news.model)
  const setOpen = useCallback(
    (value) => dispatch(toggleOpenCreateNews(value)),
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
        <DialogTitle>Добавление новости/акции</DialogTitle>
        {error && <Alert severity="error">{error}</Alert>}
        <Form
          initialValues={initialValues}
          handleClose={() => setOpen(false)}
        />
      </Dialog>
    </>
  )
}

export const Form: FC<IModelFormProps> = ({ initialValues, handleClose }) => {
  const dispatch = useAppDispatch()
  const handleSubmit = useCallback(
    (values) => {
      const formData = buildFormData(new FormData(), values)
      if (values.type === NewsType.NEWS) {
        formData.delete('product')
      }
      if (values.id_news) {
        dispatch(editNews(formData))
      } else {
        dispatch(createNews(formData))
      }
    },
    [dispatch]
  )
  return (
    <Formik<INewsModelSchema>
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {(props) => <FormikForm {...props} handleClose={handleClose} />}
    </Formik>
  )
}

const FormikForm: FC<FormikProps<INewsModelSchema> & IModelFormProps> = ({
  handleSubmit,
  handleClose,
  touched,
  errors,
  values,
  setFieldValue
}) => {
  const imgUrl = (value: string | File) =>
    value &&
    (typeof value === 'string' ? value : window.URL.createObjectURL(value))

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]
    if (file) {
      resizeImg(file, imgConfig, (file) => setFieldValue(e.target.name, file))
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={7}>
            <TextField label="Заголовок" name="title" />
          </Grid>
          <Grid item xs={6} sm={5}>
            <Select name="type" label="Тип">
              {newsTypes.map((option) => (
                <MenuItem value={option.type} key={option.type}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField label="Описание" name="description" multiline />
          </Grid>
          <Grid item xs={6} sm={6}>
            <FormControl
              error={!!(touched.image_preview_url && errors.image_preview_url)}
            >
              <Button variant="contained" component="label">
                Превью
                <input
                  type="file"
                  hidden
                  accept={'image/*'}
                  name="image_preview_url"
                  onChange={onImageChange}
                />
              </Button>
              <FormHelperText>
                {/* {values.image?.name ?? (touched.image && errors.image)} */}
              </FormHelperText>
            </FormControl>
            {values.image_preview_url && (
              <StyledImagePreview
                src={imgUrl(values.image_preview_url)}
                alt=""
              />
            )}
          </Grid>
          <Grid item xs={6} sm={6}>
            <FormControl
              error={!!(touched.image_preview_url && errors.image_preview_url)}
            >
              <Button variant="contained" component="label">
                Основная картинка
                <input
                  type="file"
                  hidden
                  accept={'image/*'}
                  name="image_url"
                  onChange={onImageChange}
                />
              </Button>
              <FormHelperText>
                {/* {values.image?.name ?? (touched.image && errors.image)} */}
              </FormHelperText>
            </FormControl>
            {values.image_url && (
              <StyledImagePreview src={imgUrl(values.image_url)} alt="" />
            )}
          </Grid>
          {values.id_news ? (
            <Products />
          ) : (
            values.type === 'promotion' && (
              <Grid item xs={12} sm={12}>
                <Typography variant="h6" component="h6">
                  Товары
                </Typography>
                <ProductSelect<true>
                  multiple
                  onChange={(e, products) => {
                    setFieldValue(
                      'product',
                      products.map((p) => p.id)
                    )
                  }}
                />
              </Grid>
            )
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button type="button" color="primary" onClick={handleClose}>
          Отмена
        </Button>
        <Button color="primary" type="submit">
          {values.id_news ? 'Сохранить' : 'Добавить'}
        </Button>
      </DialogActions>
    </form>
  )
}

const Products: FC = () => {
  const [showAddProduct, setShowAddProduct] = useState(false)
  const dispatch = useAppDispatch()
  const { data } = useAppSelector((state) => state.news.detail)
  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'id',
        headerName: 'ID позиции в акции',
        width: 40,
        disableColumnMenu: true,
        sortable: false
      },
      {
        field: 'id_product',
        headerName: 'ID товара',
        width: 40,
        disableColumnMenu: true,
        sortable: false
      },
      {
        field: 'name',
        headerName: 'Наименование',
        minWidth: 250,
        disableColumnMenu: true,
        sortable: false,
        valueGetter: ({ row }: GridValueFormatterParams) =>
          row.product_info.name
      },
      {
        field: 'id_category',
        headerName: 'ID категории',
        width: 60,
        disableColumnMenu: true,
        sortable: false,
        valueGetter: ({ row }: GridValueFormatterParams) =>
          row.product_info.id_category
      },
      {
        field: 'category_name',
        headerName: 'Категория',
        width: 150,
        disableColumnMenu: true,
        sortable: false,
        valueGetter: ({ row }: GridValueFormatterParams) =>
          row.product_info.category_name
      },
      {
        field: 'price',
        headerName: 'Цена',
        minWidth: 100,
        disableColumnMenu: true,
        sortable: false,
        valueGetter: ({ row }: GridValueFormatterParams) =>
          row.product_info.price
      },
      {
        field: 'img',
        headerName: 'Фото',
        width: 50,
        disableColumnMenu: true,
        sortable: false,
        renderCell: ({ row }: GridCellParams) => (
          <img
            src={row.product_info.img as string}
            alt=""
            style={{ width: 50 }}
          />
        )
      },
      {
        field: 'status',
        headerName: 'Статус',
        minWidth: 60,
        disableColumnMenu: true,
        sortable: false,
        valueGetter: ({ row }: GridValueFormatterParams) =>
          productStatus[row.product_info.status as number]
      },
      {
        field: 'actions',
        headerName: '',
        disableColumnMenu: true,
        sortable: false,
        renderCell: ({ row }: GridCellParams) => (
          <>
            {row.status === 0 && (
              <UpdateStatusButton id={row.id} status={1} type="product" />
            )}
            {row.status === 1 && (
              <UpdateStatusButton id={row.id} status={0} type="product" />
            )}
          </>
        ),
        width: 60
      }
    ],
    []
  )
  return (
    <Grid item sm={12}>
      <Typography variant="h6" component="span">
        Товары
        <Tooltip title="Добавить">
          <IconButton
            type="button"
            color="primary"
            onClick={() => setShowAddProduct(true)}
          >
            <AddCircleOutlinedIcon />
          </IconButton>
        </Tooltip>
      </Typography>
      {showAddProduct && (
        <ProductSelect<false>
          onChange={(e, product) => {
            dispatch(
              addNewsProduct({
                id_news: data!.id,
                id_product: product!.id
              })
            )
            setShowAddProduct(false)
          }}
        />
      )}
      <div style={{ height: 400 }}>
        <DataGrid rows={data!.promotion_product} columns={columns} />
      </div>
    </Grid>
  )
}
