import { lazy } from 'react'

const Dashboard = lazy(() => import('../pages/Dashboard'))
const Units = lazy(() => import('../pages/Units/Units'))
const Categories = lazy(() => import('../pages/Categories'))
const Users = lazy(() => import('../pages/Users'))
const Products = lazy(() => import('../pages/Products'))
const Stock = lazy(() => import('../pages/Stock'))
const Auth = lazy(() => import('../pages/Auth'))
const Points = lazy(() => import('../pages/Points'))
const Reports = lazy(() => import('../pages/Reports'))
const Orders = lazy(() => import('../pages/Orders'))
const OrderDetail = lazy(() => import('../pages/Orders/Detail'))
const Promocodes = lazy(() => import('../pages/Promocodes'))
const News = lazy(() => import('../pages/News'))
const Purchase = lazy(() => import('../pages/Purchase'))
const PurchaseDetail = lazy(() => import('../pages/Purchase/Detail'))
const PurchaseOrder = lazy(() => import('../pages/Purchase/Order'))
const DriverOrder = lazy(() => import('../pages/Driver/Order'))

export default {
  Dashboard,
  Units,
  Categories,
  Users,
  Products,
  Stock,
  Auth,
  Points,
  Reports,
  Orders,
  OrderDetail,
  Promocodes,
  News,
  Purchase,
  PurchaseDetail,
  PurchaseOrder,
  DriverOrder
}
