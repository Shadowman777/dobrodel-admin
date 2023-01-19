import React, { useCallback, useEffect } from 'react'
import {
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useAppDispatch, useAppSelector } from 'hooks/appHooks'
import { confirmOrder } from 'store/slices/driver/thunks'
import { resetOrder } from 'store/slices/driver/slice'
import { StyledForm, StyledPaper, StyledSubmit } from './styled'

const DriverOrder = () => {
  const { error, confirmed, loading } = useAppSelector(
    (state) => state.driver.order
  )

  const dispatch = useAppDispatch()
  const handleSubmit = useCallback(
    (values) => {
      if (loading) return
      dispatch(confirmOrder(values))
    },
    [dispatch, loading]
  )
  const formik = useFormik({
    onSubmit: handleSubmit,
    initialValues: { code: '' },
    validationSchema: Yup.object({
      code: Yup.string().required()
    })
  })
  useEffect(() => {
    if (confirmed) {
      setTimeout(() => {
        formik.resetForm()
        dispatch(resetOrder())
      }, 3000)
    }
  }, [confirmed, dispatch, formik])
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <StyledPaper>
        <Typography component="h1" variant="h5">
          Подтверждение заказа
        </Typography>
        <StyledForm noValidate onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="code"
                label="Код подтверждения"
                name="code"
                autoComplete="off"
                onChange={formik.handleChange}
                error={!!(formik.touched.code && formik.errors.code)}
                helperText={formik.touched.code && formik.errors.code}
              />
            </Grid>
          </Grid>
          <StyledSubmit
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? 'Идет отправка' : 'Отправить'}
          </StyledSubmit>
          {error && <Alert severity="error">{error}</Alert>}
          {confirmed && (
            <Alert severity="success">Заказ успешно подтвержден</Alert>
          )}
        </StyledForm>
      </StyledPaper>
    </Container>
  )
}

export default DriverOrder
