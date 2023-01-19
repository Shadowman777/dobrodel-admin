import { Button, Drawer, Typography } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import withWidth, { WithWidthProps } from '@material-ui/core/withWidth'
import React, { FC, useState } from 'react'

type InjectedChildrenProps = {
  closeFilters: () => void
}

interface WrapperProps extends WithWidthProps {
  children: (props: InjectedChildrenProps) => React.ReactNode
}

const Wrapper: FC<WrapperProps> = ({ width, children }) => {
  const [open, setOpen] = useState<boolean>(false)
  const toggleFilters = () => setOpen(!open)
  const closeFilters = () => setOpen(false)
  if (width === 'xs') {
    return (
      <>
        <Drawer anchor="right" open={open} onClose={toggleFilters}>
          <div style={{ width: 360, padding: 15 }}>
            <Typography
              variant="h5"
              component="h2"
              style={{ marginBottom: 20 }}
            >
              Фильтры
            </Typography>
            {children({ closeFilters })}
          </div>
        </Drawer>

        <Button onClick={toggleFilters} color="primary" variant="contained">
          <SearchIcon /> Фильтр
        </Button>
      </>
    )
  }
  return <>{children({ closeFilters })}</>
}

export const FiltersWrapper = withWidth()(Wrapper)
