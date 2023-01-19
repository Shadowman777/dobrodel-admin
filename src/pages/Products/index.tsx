import React, { FC, useEffect } from 'react'
import Layout from 'components/Layout'

import { deleteProduct, getTaxes } from 'store/slices/product/thunks'

import { IconButton, Tooltip } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { useConfirm } from 'material-ui-confirm'
import { useAppSelector, useAppDispatch } from 'hooks/appHooks'
import { CreateModel } from './components/Model'
import { getUnits } from '../../store/slices/unit/thunks'
import {
  getCategories,
  getInternalCategories
} from '../../store/slices/category/thunks'
import { getSuppliers } from '../../store/slices/supplier/thunks'
import { EditModelProps } from './types'
import { Import } from './components/Import'
import Grid from './components/Grid'
import { Filters } from './components/Filters'

const DeleteButton: FC<EditModelProps> = ({ id }) => {
  const dispatch = useAppDispatch()
  const confirm = useConfirm()
  const handleClick = async () => {
    await confirm({
      description: 'Вы уверены, что хотите удалить товар?'
    })
    dispatch(deleteProduct({ id }))
  }
  return (
    <Tooltip title="Удалить">
      <IconButton onClick={handleClick}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  )
}

const Products: FC = () => {
  const dispatch = useAppDispatch()

  const taxes = useAppSelector((state) => state.product.taxes.data)
  const units = useAppSelector((state) => state.unit.items.data)
  const categories = useAppSelector((state) => state.category.items.data)
  const suppliers = useAppSelector((state) => state.supplier.items.data)
  const internalCategories = useAppSelector(
    (state) => state.category.internal.data
  )

  useEffect(() => {
    if (!taxes.length) {
      dispatch(getTaxes())
    }
    if (!units.length) {
      dispatch(getUnits())
    }
    if (!categories.length) {
      dispatch(getCategories())
    }
    if (!internalCategories.length) {
      dispatch(getInternalCategories())
    }
    if (!suppliers.length) {
      dispatch(getSuppliers())
    }
  }, [dispatch])
  return (
    <Layout title="Товары" action={[<CreateModel />, <Import />]}>
      <Filters />
      <Grid />
    </Layout>
  )
}

export default Products
