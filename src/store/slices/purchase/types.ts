import {
  Purchase,
  PurchaseAccumulation,
  PurchaseDetail,
  PurchaseOrderDetail
} from 'types/purchases'

export interface PurchaseState {
  createModel: {
    open: boolean
    error: string
  }
  items: {
    data: Purchase[]
    loading: boolean
  }
  detail: {
    data?: PurchaseDetail
    accumulation?: PurchaseAccumulation
    loading: boolean
  }
  order: {
    data?: PurchaseOrderDetail
    loading: boolean
  }
}
