import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import AcUnit from '@material-ui/icons/AcUnit'
import PersonIcon from '@material-ui/icons/Person'
import CategoryIcon from '@material-ui/icons/Category'
import LocalMallIcon from '@material-ui/icons/LocalMall'
import StoreIcon from '@material-ui/icons/Store'
import RoomIcon from '@material-ui/icons/Room'
import AssessmentIcon from '@material-ui/icons/Assessment'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import LoyaltyIcon from '@material-ui/icons/Loyalty'
import SubjectIcon from '@material-ui/icons/Subject'

export const LeftMenu: FC = () => {
  const items = [
    {
      to: '/units',
      icon: <AcUnit />,
      name: 'Единицы измерения'
    },
    {
      to: '/categories',
      icon: <CategoryIcon />,
      name: 'Категории'
    },
    {
      to: '/users',
      icon: <PersonIcon />,
      name: 'Пользователи'
    },
    {
      to: '/products',
      icon: <LocalMallIcon />,
      name: 'Товары'
    },
    {
      to: '/stock',
      icon: <StoreIcon />,
      name: 'Склад'
    },
    {
      to: '/points',
      icon: <RoomIcon />,
      name: 'Точки доставки'
    },
    {
      to: '/reports',
      icon: <AssessmentIcon />,
      name: 'Отчеты'
    },
    {
      to: '/orders',
      icon: <ShoppingCartIcon />,
      name: 'Заказы'
    },
    {
      to: '/promocodes',
      icon: <LoyaltyIcon />,
      name: 'Промокоды'
    },
    {
      to: '/news',
      icon: <SubjectIcon />,
      name: 'Новости и акции'
    },
    {
      to: '/purchase',
      icon: <SubjectIcon />,
      name: 'Заявки'
    }
  ]
  return (
    <List>
      {items.map((item) => (
        <ListItem button component={Link} to={item.to} key={item.to}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItem>
      ))}
    </List>
  )
}
