import {
  Chip,
  CircularProgress,
  debounce,
  FormGroup,
  FormHelperText,
  TextField
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import React, { useMemo, useState } from 'react'
import { Product } from 'types/products'
import ax from 'utils/ax'
import { AutocompleteProps } from '@material-ui/lab/Autocomplete/Autocomplete'
import styled from 'styled-components'

export const ProductSelect: <T extends boolean | undefined>(
  p: Partial<AutocompleteProps<Product, T, undefined, undefined>>
) => React.ReactElement = (props) => {
  const [open, setOpen] = React.useState(false)

  const [options, setOptions] = React.useState([])
  const [loading, setLoading] = useState<boolean>(false)

  const onInput = useMemo(
    () =>
      debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length >= 3) {
          setLoading(true)
          ax.post('/product/search', {
            name: e.target.value,
            limit: 20,
            offset: 0
          }).then((response) => {
            setOptions(response.data.data.products)
            setLoading(false)
          })
        }
      }, 300),
    []
  )
  return (
    <FormGroup>
      <Autocomplete
        {...props}
        open={open}
        filterSelectedOptions
        onOpen={() => {
          setOpen(true)
        }}
        onClose={() => {
          setOptions([])
          setOpen(false)
        }}
        getOptionSelected={(option, value) => option.name === value.name}
        getOptionLabel={(option) => option.name}
        renderOption={(option) => (
          <StyledOption>
            <span>{option.id}</span>
            <span>{option.name}</span>
            <Chip label={option.category_name} size="small" />
            <Chip
              label={`Цена: ${option.price}`}
              size="small"
              color="primary"
            />
            <StyledImage>
              <img src={option.img as string} alt="" style={{ width: 30 }} />
            </StyledImage>
          </StyledOption>
        )}
        options={options}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Поиск товара"
            variant="outlined"
            onChange={onInput}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              )
            }}
          />
        )}
      />
      <FormHelperText>Введите наименование товара</FormHelperText>
    </FormGroup>
  )
}

const StyledOption = styled.div`
  display: flex;
  grid-column-gap: 15px;
  align-items: center;
  width: 100%;
`

const StyledImage = styled.div`
  flex: 1;
  text-align: right;
`
