import React, { FC } from 'react'
import { useConfirm } from 'material-ui-confirm'
import { IconButton, Tooltip } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import { useAppDispatch } from 'hooks/appHooks'
import {
  updateNewsProductStatus,
  updateNewsStatus
} from 'store/slices/news/thunks'
import { UpdateStatusProps } from './types'

export const UpdateStatusButton: FC<UpdateStatusProps> = ({
  id,
  status,
  type = 'news'
}) => {
  const dispatch = useAppDispatch()
  const statusMap = {
    0: {
      icon: <VisibilityIcon />,
      title: 'Отображать'
    },
    1: {
      icon: <DeleteIcon />,
      title: 'Удалить'
    },
    2: {
      icon: <VisibilityOffIcon />,
      title: 'Скрыть'
    }
  }
  const confirm = useConfirm()
  const handleClick = async () => {
    await confirm({
      description: 'Вы уверены, что хотите изменить статус?'
    })
    switch (type) {
      case 'news':
        dispatch(updateNewsStatus({ id_news: id, status }))
        break
      case 'product':
        dispatch(updateNewsProductStatus({ id_promotion_product: id, status }))
        break
      default:
        break
    }
  }
  return (
    <Tooltip title={statusMap[status].title}>
      <IconButton onClick={handleClick}>{statusMap[status].icon}</IconButton>
    </Tooltip>
  )
}
