import React, { useCallback, useState } from 'react'
import {
  Container,
  CssBaseline,
  Grid,
  TextField,
  Link,
  Typography
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useFormik } from 'formik'
import { useAppDispatch } from 'hooks/appHooks'
import { setLoggedIn } from 'store/slices/main/slice'
import * as Yup from 'yup'
import { StyledForm, StyledPaper, StyledSubmit } from './styled'

const creds = [
  {
    login: 'pilugin',
    password: 'ghbxbyzqlj,hj'
  },
  {
    login: 'nezametdinov',
    password: 'Ytpfvtnlbyjd'
  },
  {
    login: 'admin',
    password: 'Lj,hjltk'
  }
]

const Auth = () => {
  const [lostPassword, setLostPassword] = useState(false)
  const [error, setError] = useState('')
  const dispatch = useAppDispatch()
  const handleSubmit = useCallback(
    (values) => {
      if (
        creds.find((cred) => {
          return (
            values.login.toLowerCase() === cred.login &&
            values.password === cred.password
          )
        })
      ) {
        dispatch(setLoggedIn(true))
      } else {
        setError('Неправильный логин или пароль')
      }
    },

    [dispatch]
  )
  const formik = useFormik({
    onSubmit: handleSubmit,
    initialValues: { login: '', password: '' },
    validationSchema: Yup.object({
      login: Yup.string().required(),
      password: Yup.string().required()
    })
  })
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <StyledPaper>
        <Typography component="h1" variant="h5">
          Авторизация
        </Typography>
        <StyledForm noValidate onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="login"
                label="Логин"
                name="login"
                autoComplete="login"
                onChange={formik.handleChange}
                error={!!(formik.touched.login && formik.errors.login)}
                helperText={formik.touched.login && formik.errors.login}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={formik.handleChange}
                error={!!(formik.touched.password && formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
          </Grid>
          <StyledSubmit
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Войти
          </StyledSubmit>
          <Grid container justify="flex-end">
            <Grid item>
              <Link
                href="/"
                variant="body2"
                onClick={(e) => {
                  e.preventDefault()
                  setLostPassword(true)
                }}
              >
                Забыли пароль?
              </Link>
            </Grid>
          </Grid>
          {lostPassword && (
            <Alert severity="error">
              Обратитесь к администратору для восстановления пароля
            </Alert>
          )}
          {error && <Alert severity="error">{error}</Alert>}
        </StyledForm>
      </StyledPaper>
    </Container>
  )
}

export default Auth
