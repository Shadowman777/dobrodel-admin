import { Order, OrderRequest, OrderStatus, OrderDetail } from 'types/orders'

export interface OrderState {
  items: OrdersList
  statuses: OrderStatus[]
  filters: OrderRequest
  detail?: OrderDetail
}

export interface OrdersList {
  count?: number
  loading: boolean
  orders: Order[]
}
