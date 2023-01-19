import { debounce, FormGroup, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import React, { FC, useMemo, useEffect, useState } from 'react'

import loadMap from 'utils/loadMap'

interface Props {
  onChange: (value: any) => void
  value: string
}

export const PointSelect: FC<Props> = ({ onChange, value }) => {
  const [open, setOpen] = useState(false)
  const [platform, setPlatform] = useState<any>()

  const [options, setOptions] = useState([])

  useEffect(() => {
    loadMap().then((platform: any) => {
      setPlatform(platform)
    })
  }, [])

  const onInput = useMemo(
    () =>
      debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length >= 3) {
          const geocoder = platform.getSearchService()
          geocoder.geocode(
            {
              q: e.target.value
            },
            (result: any) => {
              setOptions(result.items)
            },
            () => {} // error
          )
        }
      }, 300),
    [platform]
  )
  return (
    <FormGroup>
      <Autocomplete<{ title: string }>
        open={open}
        onOpen={() => {
          setOpen(true)
        }}
        onClose={() => {
          setOptions([])
          setOpen(false)
        }}
        filterOptions={(o) => o}
        getOptionSelected={(option, value) => option.title === value.title}
        getOptionLabel={(option) => option.title}
        options={options.length ? options : [{ title: value }]}
        value={value ? { title: value } : null}
        loading={false}
        onChange={(e, newValue) => onChange(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Адрес"
            variant="outlined"
            onChange={onInput}
            InputProps={{
              ...params.InputProps,
              endAdornment: params.InputProps.endAdornment
            }}
          />
        )}
      />
    </FormGroup>
  )
}
