import React from 'react'
import { Formik } from 'formik'
import { Box, Button, Grid } from '@material-ui/core'
import { setConfig } from 'store/slices/product/slice'
import { ProductsFilters } from 'store/slices/product/types'
import { FiltersWrapper } from 'components/FiltersWrapper'
import { useAppSelector, useAppDispatch } from 'hooks/appHooks'
import { TextField } from '../../../components/form'
import { filterInitialValues } from '../config'

export const Filters = () => {
  const dispatch = useAppDispatch()

  const initialValues = useAppSelector((state) => state.product.items.filters)

  return (
    <FiltersWrapper>
      {({ closeFilters }) => (
        <Formik<ProductsFilters>
          initialValues={initialValues}
          onSubmit={(filters) => {
            dispatch(setConfig({ filters, offset: 0 }))

            closeFilters()
          }}
        >
          {({ handleSubmit, resetForm }) => (
            <form onSubmit={handleSubmit}>
              <Grid
                container
                spacing={2}
                style={{ marginBottom: '20px' }}
                alignItems="center"
              >
                <Grid item xs={12} sm={2}>
                  <TextField label="ID" name="id" type="number" />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField label="Название" name="name" />
                </Grid>
                <Grid item sm={4}>
                  <Box display="flex">
                    <Box mr={2}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                      >
                        Получить
                      </Button>
                    </Box>
                    <Box>
                      <Button
                        type="button"
                        variant="contained"
                        color="default"
                        size="large"
                        onClick={() => {
                          resetForm({ values: filterInitialValues })
                          handleSubmit()
                          closeFilters()
                        }}
                      >
                        Сброс
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      )}
    </FiltersWrapper>
  )
}
