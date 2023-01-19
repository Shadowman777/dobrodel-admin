import React, { FC, useCallback } from 'react'
import { Formik } from 'formik'
import { useAppDispatch } from 'hooks/appHooks'
import {
  Button,
  MenuItem,
  Grid,
  FormControl,
  FormHelperText,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent
} from '@material-ui/core'
import { toggleOpenCreateCategory } from 'store/slices/category/slice'
import { createCategory } from 'store/slices/category/thunks'
import { Alert } from '@material-ui/lab'
import { TextField, Select } from 'components/form'
import { imgConfig } from 'pages/Products/config'
import { useAppSelector } from '../../hooks/appHooks'
import { ICreateFormProps, ICreateSchema } from './types'
import { buildFormData } from '../../utils/buildFormData'
import { resizeImg } from '../../utils/resizeImg'
import { createInitialValues, createValidationSchema } from './config'
import { StyledImagePreview } from '../Products/styled'

export const CreateForm: FC = () => {
  const dispatch = useAppDispatch()
  const { open, error } = useAppSelector((state) => state.category.createModel)
  const setOpen = useCallback(
    (value) => dispatch(toggleOpenCreateCategory(value)),
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
        maxWidth="sm"
      >
        <DialogTitle>Добавление категории</DialogTitle>
        {error && <Alert severity="error">{error}</Alert>}
        <Form handleClose={() => setOpen(false)} />
      </Dialog>
    </>
  )
}

export const Form: FC<ICreateFormProps> = ({ handleClose }) => {
  const dispatch = useAppDispatch()
  const onSubmit = useCallback(
    (values) => {
      const formData = buildFormData(new FormData(), values)
      dispatch(createCategory(formData))
    },
    [dispatch]
  )
  const options = useAppSelector((state) => state.category.items.data)

  return (
    <Formik<ICreateSchema>
      initialValues={createInitialValues}
      onSubmit={onSubmit}
      validationSchema={createValidationSchema}
    >
      {({ handleSubmit, touched, errors, values, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={1}>
              <Grid item xs={6} sm={5}>
                <TextField label="Название категории" name="name" />
              </Grid>
              <Grid item xs={6} sm={7}>
                <Select name="id_parent_category" label="Родитель">
                  <MenuItem value={0}>Нет</MenuItem>
                  {options.map((option) => (
                    <MenuItem value={option.id} key={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
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
                    {values.image?.name ?? (touched.image && errors.image)}
                  </FormHelperText>
                </FormControl>
                <PreviewImg image={values.image} />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button type="button" color="primary" onClick={handleClose}>
              Отмена
            </Button>
            <Button color="primary" type="submit">
              Добавить
            </Button>
          </DialogActions>
        </form>
      )}
    </Formik>
  )
}

const PreviewImg: FC<{ image?: File }> = React.memo(({ image }) => {
  const src = image ? window.URL.createObjectURL(image) : ''
  return image ? <StyledImagePreview src={src} alt="" /> : null
})
